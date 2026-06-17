import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float time;
  varying vec2 vUv;
  varying float vDistort;

  mat2 rotate2d(float angle, float rotation) {
    return mat2(
      cos(angle * rotation), -sin(angle * rotation),
      sin(angle * rotation), cos(angle * rotation)
    );
  }

  float smileyDistort(vec2 p, float time) {
    float slowTime = time * 0.15;
    float angle = slowTime + length(p);
    float distortion = sin(angle * 3.0) * cos(angle * 2.0);
    return distortion * 0.4;
  }

  float blobShape(vec2 p, float time) {
    float a = atan(p.y, p.x);
    float r = length(p);
    float shape = 1.0 - smoothstep(
      0.3 + 0.1 * sin(a * 3.0 + time * 0.2),
      0.4 + 0.1 * sin(a * 3.0 + time * 0.2),
      r
    );
    return shape;
  }

  void main() {
    vec3 p = position;
    vec2 uv = uv;
    float distort = smileyDistort(uv, time);
    vDistort = distort;
    vec4 modelViewPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
    vUv = uv;
  }
`;

const fragmentShader = `
  uniform float time;
  uniform sampler2D texture1;
  varying vec2 vUv;
  varying float vDistort;

  vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = vUv;
    float distort = vDistort * 0.1;
    vec3 bright = vec3(1.0, 0.8, 0.9);
    vec3 dark = vec3(0.8, 0.6, 1.0);
    vec3 c = vec3(0.5, 0.2, 0.5);
    vec3 d = vec3(0.5, 0.5, 0.5);
    float slowTime = time * 0.15;
    vec3 color = cosPalette(distort + slowTime, bright, dark, c, d);
    vec4 textureColor = texture2D(texture1, uv);
    vec3 finalColor = mix(color, textureColor.rgb, 0.8);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function CuteDaytimeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const pink = new THREE.Color(0xffc0cb);
    pink.lerp(new THREE.Color(0xfff0f5), 0.5);

    const loader = new THREE.TextureLoader();
    const textureMoon = loader.load('/assets/3d/moon.png');
    const textureCloud = loader.load('/assets/3d/cloud.png');

    const scene = new THREE.Scene();
    scene.background = pink;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const uniforms = {
      time: { value: 0.0 },
      texture1: { value: textureMoon },
    };

    const geometry = new THREE.PlaneGeometry(10, 10, 128, 128);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const cuteFace = new THREE.Mesh(geometry, material);
    scene.add(cuteFace);

    const cloudsData: { position: [number, number, number]; scale: [number, number, number]; rotationSpeed: number; texture: THREE.Texture }[] = [
      { position: [-4, 2, -2], scale: [1.5, 1.5, 1.5], rotationSpeed: 0.3, texture: textureCloud },
      { position: [4, -1, -3], scale: [1.2, 1.2, 1.2], rotationSpeed: -0.2, texture: textureCloud },
      { position: [0, 3, -4], scale: [0.8, 0.8, 0.8], rotationSpeed: 0.5, texture: textureMoon },
    ];

    const clouds: THREE.Mesh[] = [];
    const cloudGeo = new THREE.PlaneGeometry(1, 1);

    cloudsData.forEach((cloud) => {
      const cloudMat = new THREE.MeshBasicMaterial({
        map: cloud.texture,
        transparent: true,
        opacity: cloud.texture === textureCloud ? 0.6 : 0.3,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(cloudGeo, cloudMat);
      mesh.position.set(...cloud.position);
      mesh.scale.set(...cloud.scale);
      scene.add(mesh);
      clouds.push(mesh);
    });

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      uniforms.time.value += 0.01;
      cuteFace.rotation.y += 0.002;
      clouds.forEach((cloud) => {
        cloud.rotation.y += 0.002;
      });
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scene.rotation.y = mouse.x * 0.05;
      scene.rotation.x = mouse.y * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      cloudGeo.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
      }}
    />
  );
}
