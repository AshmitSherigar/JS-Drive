import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 200;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

const loader = new GLTFLoader();

loader.load( './super_human.glb', function ( gltf ) {
    console.log(gltf);
    gltf.scene.position.y = -100
    
	scene.add( gltf.scene );    

}, undefined, function ( error ) {

	console.error( error );

} );
// Load HDRI environment
const rgbeLoader = new RGBELoader();
rgbeLoader.load('../zwartkops_pit_1k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    // scene.background = texture;
});

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01

// import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
// const controls = new PointerLockControls(camera, document.body);
// document.addEventListener("click", () => controls.lock());

// const controls = new FlyControls(camera, renderer.domElement);
// controls.movementSpeed = 5;
// controls.rollSpeed = 0.5;

// Create a simple box geometry
// const geometry = new THREE.BoxGeometry(1.4, 1.3, 1);
// const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
// const box = new THREE.Mesh(geometry, material);
// scene.add(box);

// Handle window resizing
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate();

