"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

/**
 * Cordillera al anochecer (o de día, en modo claro): cinco capas de montañas generadas con ruido,
 * un macizo nevado de tres cumbres en la más lejana, línea de árboles en las cercanas, niebla que se desplaza y estrellas.
 */
const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uLight; uniform float uSeed; uniform vec2 uCrop;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  uv.y = mix(uCrop.x, uCrop.y, uv.y);
  float asp = uRes.x / uRes.y * (uCrop.y - uCrop.x);
  vec2 p = vec2(uv.x * asp, uv.y);

  vec3 skyTop = mix(vec3(0.015, 0.015, 0.06), vec3(0.36, 0.62, 0.90), uLight);
  vec3 skyHor = mix(vec3(0.46, 0.17, 0.50), vec3(0.99, 0.88, 0.80), uLight);
  vec3 col = mix(skyHor, skyTop, smoothstep(0.30, 1.0, uv.y));

  vec2 sp = vec2(asp * 0.70, 0.66);
  float d = length(p - sp);
  vec3 orb = mix(vec3(1.0, 0.62, 0.80), vec3(1.0, 0.96, 0.84), uLight);
  col += orb * (0.010 / (d * d + 0.012));
  col = mix(col, orb, smoothstep(0.062, 0.056, d));

  vec2 cell = floor(gl_FragCoord.xy / 2.0);
  float star = step(0.9972, hash(cell + uSeed)) * (0.55 + 0.45 * sin(uTime * 1.7 + hash(cell) * 40.0));
  col += star * (1.0 - uLight) * smoothstep(0.50, 0.95, uv.y);

  vec3 farC = mix(vec3(0.36, 0.26, 0.56), vec3(0.66, 0.78, 0.90), uLight);
  vec3 nearC = mix(vec3(0.012, 0.014, 0.035), vec3(0.07, 0.25, 0.20), uLight);
  vec3 snowC = mix(vec3(0.90, 0.84, 0.98), vec3(1.0), uLight);

  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float depth = fi / 4.0;
    float x = p.x + uMouse.x * 0.045 * (0.25 + depth) + uTime * 0.0035 * (0.4 + depth * 2.2);
    float base = 0.46 - depth * 0.38 + uMouse.y * 0.012 * depth;
    float amp = 0.36 - depth * 0.17;
    float n = fbm(vec2(x * (2.0 + depth * 2.2) + fi * 17.3 + uSeed, fi * 3.1));
    if (i < 2) n = mix(n, 1.0 - abs(2.0 * n - 1.0), 0.7);
    float h = base + n * amp;
    if (i == 0) {
      // Macizo de tres cumbres, inspirado en el Illimani.
      float sx = gl_FragCoord.x / uRes.x;
      h += 0.17 * exp(-pow((sx - 0.27) / 0.095, 2.0)) + 0.13 * exp(-pow((sx - 0.37) / 0.065, 2.0)) + 0.11 * exp(-pow((sx - 0.18) / 0.06, 2.0));
    }
    if (i >= 3) {
      float tx = x * (22.0 + fi * 9.0);
      float id = floor(tx);
      float t = abs(fract(tx) - 0.5) * 2.0;
      h += pow(1.0 - t, 1.6) * 0.07 * step(0.25, hash(vec2(id, fi))) * (0.5 + 0.9 * hash(vec2(id, fi + 1.0)));
    }
    float m = smoothstep(h + 0.0025, h - 0.0025, uv.y);
    vec3 c = mix(farC, nearC, pow(depth, 0.8));
    if (i == 0) {
      float snow = smoothstep(h - 0.085, h - 0.015, uv.y) * smoothstep(0.60, 0.72, h);
      c = mix(c, snowC, snow * 0.85);
    }
    c = mix(c, skyHor, (1.0 - depth) * 0.42 * smoothstep(h, h - 0.28, uv.y));
    col = mix(col, c, m);
    float mist = fbm(vec2(p.x * 1.4 + uTime * 0.025 * (1.0 + fi), uv.y * 7.0 + fi * 5.0));
    col = mix(col, mix(skyHor, vec3(1.0), 0.25), mist * 0.16 * (1.0 - depth) * smoothstep(h + 0.02, h - 0.16, uv.y));
  }
  gl_FragColor = vec4(col, 1.0);
}`;

interface NatureSceneProps {
  className?: string;
  seed?: number;
  /** Franja vertical de la escena que se muestra, de 0 (abajo) a 1 (arriba). */
  cropFrom?: number;
  cropTo?: number;
}

export function NatureScene({ className, seed = 0, cropFrom = 0, cropTo = 1 }: NatureSceneProps) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "width:100%;height:100%;display:block";
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;
    el.appendChild(canvas);

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram();
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!program || !vs || !fs) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uRes = u("uRes");
    const uTime = u("uTime");
    const uMouse = u("uMouse");
    const uLight = u("uLight");
    gl.uniform1f(u("uSeed"), seed);
    gl.uniform2f(u("uCrop"), cropFrom, cropTo);

    const resize = () => {
      // clientWidth no cambia con las transformaciones de entrada (escala), a diferencia de getBoundingClientRect.
      const width = el.clientWidth;
      const height = el.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const root = document.documentElement;
    let light = root.classList.contains("dark") ? 0 : 1;
    let lightTarget = light;
    const themeWatch = new MutationObserver(() => {
      lightTarget = root.classList.contains("dark") ? 0 : 1;
      if (reduced) {
        light = lightTarget;
        draw(performance.now());
      }
    });
    themeWatch.observe(root, { attributes: true, attributeFilter: ["class"] });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    function draw(now: number) {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      light += (lightTarget - light) * 0.08;
      gl!.uniform1f(uTime, reduced ? 12 : (now - start) / 1000);
      gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.uniform1f(uLight, light);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    io.observe(el);

    let raf = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (visible) draw(now);
    };
    ro.observe(el);
    resize();
    if (reduced) draw(start);
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      themeWatch.disconnect();
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [seed, cropFrom, cropTo]);

  return <div ref={host} aria-hidden className={className} />;
}
