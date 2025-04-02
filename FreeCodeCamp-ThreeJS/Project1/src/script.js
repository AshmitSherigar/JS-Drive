import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import getStarfield from "./getStarfield.js";
import { getFresnelMat } from "./getFresnelMat.js"; // Ensure this file exists

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Color and tone mapping improvements
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

// Create Earth Group
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -0.2; // Slight tilt to the right
scene.add(earthGroup);

const loader = new THREE.TextureLoader();
const detail = 12;
const geometry = new THREE.IcosahedronGeometry(1, detail);

// 🌍 **Earth Texture with Bump & Specular Mapping**
const earthMaterial = new THREE.MeshPhongMaterial({
  map: loader.load("earthmap1k.jpg"),
  specularMap: loader.load("02_earthspec1k.jpg"),
  bumpMap: loader.load("01_earthbump1k.jpg"),
  bumpScale: 0.04,
});
const earthMesh = new THREE.Mesh(geometry, earthMaterial);
earthGroup.add(earthMesh);

// 🌃 **City Lights Layer (Night Glow)**
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
  transparent: true,
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

// ☁️ **Clouds Layer**
const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("04_earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load("05_earthcloudmaptrans.jpg"),
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

// 🌌 **Fresnel Glow (Atmosphere)**
const fresnelMat = getFresnelMat(); // Ensure this function exists
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

// ✨ **Starfield Background**
const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

// ☀️ **Sunlight Direction**
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// 🌀 **Orbit Controls for Interaction**
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.5;

// 🔄 **Animation Loop**
function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.002;
  lightsMesh.rotation.y += 0.002;
  cloudsMesh.rotation.y += 0.0023;
  glowMesh.rotation.y += 0.002;
  stars.rotation.y -= 0.0002;

  controls.update(); // Ensure smooth interaction
  renderer.render(scene, camera);
}

animate();

// 🔄 **Responsive Window Resizing**
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEvent
