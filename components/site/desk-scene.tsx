"use client";

import { useEffect, useRef } from "react";

const CREAM = "#ffedd7";
const ORANGE = "#dc5000";

/** Textura de madera: vetas largas con variación suave. */
function woodTexture(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1024;
  const g = c.getContext("2d");
  if (!g) return c;
  g.fillStyle = "#7a4c2a";
  g.fillRect(0, 0, 1024, 1024);
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < 900; i++) {
    const x = rnd() * 1024;
    const w = 1 + rnd() * 5;
    g.fillStyle = rnd() > 0.5 ? `rgba(40,20,8,${0.03 + rnd() * 0.09})` : `rgba(255,200,140,${0.02 + rnd() * 0.05})`;
    g.beginPath();
    g.moveTo(x, 0);
    for (let y = 0; y <= 1024; y += 64) g.lineTo(x + Math.sin(y * 0.01 + i) * 6, y);
    g.lineTo(x + w, 1024);
    g.lineTo(x + w, 0);
    g.fill();
  }
  return c;
}

/** Textura del tablero de corte: cuadrícula, reglas y el plano del recorrido dibujado encima. */
function matTexture(nodes: string[]): HTMLCanvasElement {
  const W = 2200;
  const H = 1500;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d");
  if (!g) return c;
  g.fillStyle = "#445231";
  g.fillRect(0, 0, W, H);

  const m = 90;
  const cell = 20;
  for (let x = m; x <= W - m; x += cell) {
    const major = (x - m) % 100 === 0;
    g.strokeStyle = major ? "rgba(246,224,198,0.34)" : "rgba(246,224,198,0.1)";
    g.lineWidth = major ? 2 : 1;
    g.beginPath();
    g.moveTo(x, m);
    g.lineTo(x, H - m);
    g.stroke();
  }
  for (let y = m; y <= H - m; y += cell) {
    const major = (y - m) % 100 === 0;
    g.strokeStyle = major ? "rgba(246,224,198,0.34)" : "rgba(246,224,198,0.1)";
    g.lineWidth = major ? 2 : 1;
    g.beginPath();
    g.moveTo(m, y);
    g.lineTo(W - m, y);
    g.stroke();
  }
  g.strokeStyle = "rgba(246,224,198,0.6)";
  g.lineWidth = 3;
  g.strokeRect(m, m, W - 2 * m, H - 2 * m);
  g.fillStyle = "rgba(246,224,198,0.6)";
  g.font = "600 22px sans-serif";
  g.textAlign = "center";
  for (let x = m + 100, n = 1; x < W - m; x += 100, n++) g.fillText(String(n * 10), x, H - m + 34);
  g.textAlign = "right";
  for (let y = H - m - 100, n = 1; y > m; y -= 100, n++) g.fillText(String(n * 10), m - 14, y + 8);

  // El plano: nodos con líneas de construcción y curvas con sus anclas.
  const x0 = 170;
  const span = 800;
  const step = span / Math.max(nodes.length - 1, 1);
  const r = 62;
  const pts = nodes.map((label, i) => ({ label, x: x0 + i * step, y: i % 2 === 0 ? 860 : 1010 }));
  for (const p of pts) {
    g.strokeStyle = "rgba(255,237,215,0.3)";
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(p.x, p.y - 190);
    g.lineTo(p.x, p.y + 190);
    g.moveTo(p.x - 150, p.y);
    g.lineTo(p.x + 150, p.y);
    g.stroke();
  }
  pts.forEach((p, i) => {
    const q = pts[i + 1];
    if (!q) return;
    const c1 = p.x + step * 0.45;
    const c2 = q.x - step * 0.45;
    g.strokeStyle = CREAM;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(p.x + r, p.y);
    g.bezierCurveTo(c1, p.y, c2, q.y, q.x - r, q.y);
    g.stroke();
    g.strokeStyle = ORANGE;
    g.lineWidth = 2.5;
    g.beginPath();
    g.moveTo(p.x + r, p.y);
    g.lineTo(c1, p.y);
    g.moveTo(q.x - r, q.y);
    g.lineTo(c2, q.y);
    g.stroke();
    g.fillStyle = ORANGE;
    for (const [hx, hy] of [[c1, p.y], [c2, q.y]] as const) {
      g.beginPath();
      g.arc(hx, hy, 7, 0, Math.PI * 2);
      g.fill();
    }
  });
  for (const p of pts) {
    g.strokeStyle = CREAM;
    g.lineWidth = 3;
    g.beginPath();
    g.arc(p.x, p.y, r, 0, Math.PI * 2);
    g.stroke();
    g.strokeStyle = ORANGE;
    g.lineWidth = 2.5;
    g.beginPath();
    g.arc(p.x, p.y, 13, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = ORANGE;
    for (const [dx, dy] of [[-r, 0], [r, 0], [0, -r], [0, r]] as const) g.fillRect(p.x + dx - 7, p.y + dy - 7, 14, 14);
    g.fillStyle = CREAM;
    g.font = "700 24px sans-serif";
    g.textAlign = "center";
    g.fillText(p.label.toUpperCase(), p.x, p.y + r + 48);
  }
  return c;
}

/**
 * Mesa de trabajo en 3D real: madera, tablero de corte con el plano del sistema, lápices,
 * cúter y borrador, con luz cálida y sombras. La cámara sigue un poco al puntero y se
 * acerca al tablero al hacer scroll. Con movimiento reducido se dibuja un solo cuadro.
 */
export function DeskScene({ nodes, className }: { nodes: string[]; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const key = nodes.join("|");

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    void import("three").then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
      } catch {
        return;
      }
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      el.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = "display:block;width:100%;height:100%";

      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#2c1a0d");
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

      const tex = (canvas: HTMLCanvasElement) => {
        const t = new THREE.CanvasTexture(canvas);
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();
        return t;
      };

      // Madera.
      const wood = tex(woodTexture());
      wood.wrapS = wood.wrapT = THREE.RepeatWrapping;
      wood.repeat.set(3, 3);
      const table = new THREE.Mesh(
        new THREE.PlaneGeometry(60, 60),
        new THREE.MeshStandardMaterial({ map: wood, roughness: 0.72, metalness: 0 }),
      );
      table.rotation.x = -Math.PI / 2;
      table.receiveShadow = true;
      scene.add(table);

      // Tablero de corte con esquinas redondeadas.
      const MW = 13.2;
      const MH = 9;
      const rr = 0.45;
      const shape = new THREE.Shape();
      shape.moveTo(-MW / 2 + rr, -MH / 2);
      shape.lineTo(MW / 2 - rr, -MH / 2);
      shape.quadraticCurveTo(MW / 2, -MH / 2, MW / 2, -MH / 2 + rr);
      shape.lineTo(MW / 2, MH / 2 - rr);
      shape.quadraticCurveTo(MW / 2, MH / 2, MW / 2 - rr, MH / 2);
      shape.lineTo(-MW / 2 + rr, MH / 2);
      shape.quadraticCurveTo(-MW / 2, MH / 2, -MW / 2, MH / 2 - rr);
      shape.lineTo(-MW / 2, -MH / 2 + rr);
      shape.quadraticCurveTo(-MW / 2, -MH / 2, -MW / 2 + rr, -MH / 2);
      const matMap = tex(matTexture(nodes));
      matMap.repeat.set(1 / MW, 1 / MH);
      matMap.offset.set(0.5, 0.5);
      const mat = new THREE.Mesh(
        new THREE.ExtrudeGeometry(shape, { depth: 0.07, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 }),
        [
          new THREE.MeshStandardMaterial({ map: matMap, roughness: 0.86 }),
          new THREE.MeshStandardMaterial({ color: "#2f3a22", roughness: 0.9 }),
        ],
      );
      mat.rotation.x = -Math.PI / 2;
      mat.rotation.z = 0.045;
      mat.position.set(2.1, 0.02, -0.4);
      mat.castShadow = true;
      mat.receiveShadow = true;
      scene.add(mat);

      const std = (color: string, roughness = 0.6, metalness = 0) =>
        new THREE.MeshStandardMaterial({ color, roughness, metalness });

      // Lápiz: cuerpo hexagonal, punta de madera y mina.
      const pencil = (body: string, length: number) => {
        const group = new THREE.Group();
        const rad = 0.11;
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad, length, 6), std(body, 0.45));
        const tip = new THREE.Mesh(new THREE.ConeGeometry(rad, 0.42, 6), std("#e6c39a", 0.7));
        tip.position.y = length / 2 + 0.21;
        const lead = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.13, 6), std("#2a2420", 0.4));
        lead.position.y = length / 2 + 0.365;
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad, 0.05, 6), std("#b9895a", 0.6));
        cap.position.y = -length / 2 - 0.025;
        for (const part of [shaft, tip, lead, cap]) {
          part.castShadow = true;
          group.add(part);
        }
        group.rotation.z = Math.PI / 2;
        const holder = new THREE.Group();
        holder.add(group);
        return holder;
      };
      const p1 = pencil("#e8b98c", 4.6);
      p1.position.set(5.6, 0.21, -3.3);
      p1.rotation.y = 0.95;
      const p2 = pencil("#e2ae7e", 3.6);
      p2.position.set(6.6, 0.21, -3.0);
      p2.rotation.y = 1.05;
      const p3 = pencil("#3a3530", 3.4);
      p3.position.set(-6.4, 0.11, 1.2);
      p3.rotation.y = -2.5;
      scene.add(p1, p2, p3);

      // Cúter.
      const cutter = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.16, 0.5), std(ORANGE, 0.42));
      const slot = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.02, 0.16), std("#1b1512", 0.5));
      slot.position.set(0.1, 0.09, 0);
      const knob = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.1, 0.3), std("#1b1512", 0.5));
      knob.position.set(-0.3, 0.13, 0);
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.02, 0.26), std("#cfd3d6", 0.25, 0.9));
      blade.position.set(-1.5, -0.02, 0);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.52), std("#8f9498", 0.35, 0.8));
      head.position.set(-1.1, 0, 0);
      for (const part of [body, slot, knob, blade, head]) {
        part.castShadow = true;
        cutter.add(part);
      }
      cutter.position.set(5.4, 0.2, 3.5);
      cutter.rotation.y = -0.22;
      scene.add(cutter);

      // Borrador.
      const eraser = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.34, 0.62), std("#f1ece4", 0.85));
      eraser.position.set(-7.6, 0.17, 3.6);
      eraser.rotation.y = 0.5;
      eraser.castShadow = true;
      scene.add(eraser);

      // Luz: ventana cálida arriba a la izquierda y relleno suave.
      scene.add(new THREE.HemisphereLight("#ffe6c8", "#3a2414", 0.55));
      const sun = new THREE.DirectionalLight("#ffd9ae", 2.6);
      sun.position.set(-7, 11, -5);
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      sun.shadow.camera.left = -14;
      sun.shadow.camera.right = 14;
      sun.shadow.camera.top = 12;
      sun.shadow.camera.bottom = -12;
      sun.shadow.camera.far = 40;
      sun.shadow.radius = 6;
      sun.shadow.bias = -0.0006;
      scene.add(sun);
      const warm = new THREE.PointLight("#ff7a2e", 60, 22, 2);
      warm.position.set(-9, 2.2, 5);
      scene.add(warm);

      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      let progress = 0;
      let visible = true;
      let frame = 0;

      const place = () => {
        const aspect = camera.aspect;
        const wide = Math.min(Math.max((aspect - 0.5) / 1.3, 0), 1);
        const height = 19.5 - wide * 5.5 - progress * 4.5;
        camera.position.set(0.6 + pointer.x * 0.5 + progress * 1.2, height, 5.2 + pointer.y * 0.35 - progress * 2.4);
        camera.lookAt(0.8 + pointer.x * 0.15 + progress * 1.2, 0, 0.5 - progress * 0.6);
      };
      const resize = () => {
        const w = el.clientWidth || 1;
        const h = el.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        place();
        renderer.render(scene, camera);
      };
      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (!visible) return;
        pointer.x += (pointer.tx - pointer.x) * 0.05;
        pointer.y += (pointer.ty - pointer.y) * 0.05;
        const rect = el.getBoundingClientRect();
        progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
        place();
        renderer.render(scene, camera);
      };
      const onMove = (e: PointerEvent) => {
        pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? true;
      });
      observer.observe(el);
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();
      el.dataset.ready = "true";
      if (!reduced) {
        window.addEventListener("pointermove", onMove, { passive: true });
        frame = requestAnimationFrame(tick);
      }

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", onMove);
        observer.disconnect();
        ro.disconnect();
        scene.traverse((obj) => {
          const mesh = obj as InstanceType<typeof THREE.Mesh>;
          if (!mesh.isMesh) return;
          mesh.geometry.dispose();
          for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
            (material as InstanceType<typeof THREE.MeshStandardMaterial>).map?.dispose();
            material.dispose();
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
        delete el.dataset.ready;
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
    // `key` resume el contenido de `nodes`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return <div ref={host} aria-hidden className={className} />;
}
