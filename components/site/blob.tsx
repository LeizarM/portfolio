"use client";

import { useEffect, useRef } from "react";

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERTEX = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${NOISE}
float field(vec3 p){ return snoise(p*0.85+vec3(0.0,uTime*0.22,uTime*0.15))*0.34 + snoise(p*2.1-vec3(uTime*0.3))*0.07; }
vec3 displace(vec3 p){ vec3 n=normalize(p); return p + n*field(p); }
void main(){
  vec3 n=normalize(position);
  vec3 t=normalize(cross(n,vec3(0.0,1.0,0.0)+vec3(0.001)));
  vec3 b=cross(n,t);
  float e=0.02;
  vec3 p0=displace(position);
  vec3 p1=displace(position+t*e);
  vec3 p2=displace(position+b*e);
  vec3 dn=normalize(cross(p1-p0,p2-p0));
  if(dot(dn,n)<0.0) dn=-dn;
  vNoise=field(position);
  vec4 mv=modelViewMatrix*vec4(p0,1.0);
  vNormal=normalize(normalMatrix*dn);
  vView=normalize(-mv.xyz);
  gl_Position=projectionMatrix*mv;
}`;

const FRAGMENT = /* glsl */ `
uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform vec3 uBase; uniform float uLight;
varying vec3 vNormal; varying vec3 vView; varying float vNoise;
void main(){
  vec3 N=normalize(vNormal); vec3 V=normalize(vView);
  float fres=pow(1.0-max(dot(N,V),0.0),2.2);
  vec3 grad=mix(uA,uB,smoothstep(-0.35,0.35,vNoise));
  grad=mix(grad,uC,smoothstep(0.1,0.9,N.y*0.5+0.5)*0.55);
  vec3 L1=normalize(vec3(0.6,0.8,0.7)); vec3 L2=normalize(vec3(-0.8,-0.3,0.5));
  float s1=pow(max(dot(reflect(-L1,N),V),0.0),48.0);
  float s2=pow(max(dot(reflect(-L2,N),V),0.0),18.0);
  vec3 dark=uBase + grad*(0.12+fres*1.35) + vec3(1.0)*s1*0.75 + uB*s2*0.35;
  vec3 light=mix(uBase, grad, 0.10+fres*0.8) + vec3(1.0)*s1*0.5;
  vec3 col=mix(dark, light, uLight);
  gl_FragColor=vec4(col,1.0);
}`;

/** Esfera líquida del inicio. three.js se carga aparte para no frenar la primera pintura. */
export function Blob({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let cleanup = () => {};
    let cancelled = false;

    import("three").then((THREE) => {
      if (cancelled) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return;
      }
      const mobile = window.matchMedia("(max-width: 640px)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
      el.appendChild(renderer.domElement);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
      camera.position.z = 7;

      const uniforms = {
        uTime: { value: 0 },
        uA: { value: new THREE.Color("#7c5cff") },
        uB: { value: new THREE.Color("#3ddcff") },
        uC: { value: new THREE.Color("#ff5caa") },
        uBase: { value: new THREE.Color("#07070c") },
        uLight: { value: 0 },
      };
      // Los colores siguen al tema: esfera oscura con filo de luz, o perla clara en modo claro.
      const syncTheme = () => {
        const root = document.documentElement;
        const css = getComputedStyle(root);
        const read = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
        const isDark = root.classList.contains("dark");
        uniforms.uA.value.set(read("--glow-a", "#7c5cff"));
        uniforms.uB.value.set(read("--glow-b", "#3ddcff"));
        uniforms.uC.value.set(read("--glow-c", "#ff5caa"));
        uniforms.uBase.value.set(isDark ? "#07070c" : "#f3f1ff");
        uniforms.uLight.value = isDark ? 0 : 1;
      };
      syncTheme();
      const mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.55, mobile ? 28 : 48),
        new THREE.ShaderMaterial({ uniforms, vertexShader: VERTEX, fragmentShader: FRAGMENT }),
      );
      scene.add(mesh);

      const resize = () => {
        const { width, height } = el.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();

      const target = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 0.9;
        target.y = (e.clientY / window.innerHeight - 0.5) * 0.6;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? true;
      });
      io.observe(el);

      let raf = 0;
      const start = performance.now();
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        if (!visible) return;
        uniforms.uTime.value = (now - start) / 1000;
        mesh.rotation.y += (target.x - mesh.rotation.y) * 0.04 + 0.0012;
        mesh.rotation.x += (target.y - mesh.rotation.x) * 0.04;
        renderer.render(scene, camera);
      };
      const themeWatch = new MutationObserver(() => {
        syncTheme();
        if (reduced) renderer.render(scene, camera);
      });
      themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      if (reduced) {
        uniforms.uTime.value = 3;
        renderer.render(scene, camera);
      } else {
        raf = requestAnimationFrame(frame);
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        ro.disconnect();
        io.disconnect();
        themeWatch.disconnect();
        mesh.geometry.dispose();
        (mesh.material as InstanceType<typeof THREE.ShaderMaterial>).dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div ref={host} aria-hidden className={className} />;
}
