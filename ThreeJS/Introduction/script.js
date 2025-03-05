import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color : 0x00ff00});
const cube = new THREE.Mesh(geometry , material);
scene.add(cube);

camera.position.z = 4;

// const canvas = document.querySelector("#draw");

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild( renderer.domElement );    

// const clock = new THREE.Clock()
function animate() {

    window.requestAnimationFrame(animate)
	renderer.render( scene, camera );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

}
animate();
// renderer.setAnimationLoop( animate );










//practice - docs


// LINE

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
// camera.position.set( 0, 0, 100 );
// camera.lookAt( 0, 0, 0 );

// const scene = new THREE.Scene();

// const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

// const points = [];
// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );
// points.push( new THREE.Vector3( - 10, 0, 0 ) );


// const geometry = new THREE.BufferGeometry().setFromPoints( points );


// const line = new THREE.Line( geometry, material );


// scene.add( line );
// renderer.render( scene, camera );

//TEXT


// import * as THREE from 'three';
// import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// // Scene setup
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 2, 5);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // CSS2D Renderer (for text labels)
// const labelRenderer = new CSS2DRenderer();
// labelRenderer.setSize(window.innerWidth, window.innerHeight);
// labelRenderer.domElement.style.position = 'absolute';
// labelRenderer.domElement.style.top = '0px';
// document.body.appendChild(labelRenderer.domElement);

// // Create a cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// // Create a floating text label
// const labelDiv = document.createElement('div');
// labelDiv.textContent = '3D Cube';
// labelDiv.style.color = 'white';
// labelDiv.style.fontSize = '20px';
// labelDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
// labelDiv.style.padding = '5px';
// labelDiv.style.borderRadius = '5px';

// const labelObject = new CSS2DObject(labelDiv);
// labelObject.position.set(0, 1.2, 0); // Position the label above the cube
// cube.add(labelObject);

// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//     labelRenderer.render(scene, camera); // Render text labels
// }
// animate();

// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
// import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/loaders/GLTFLoader.js';

// // Scene, Camera, Renderer
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Load 3D Model
// const loader = new GLTFLoader();
// loader.load('LION.glb', function (gltf) {
//     scene.add(gltf.scene);
// }, undefined, function (error) {
//     console.error('Error loading model:', error);
// });

// // Add Light
// const light = new THREE.AmbientLight(0xffffff, 1);
// scene.add(light);

// // Set Camera Position
// camera.position.z = 5;

// // Animation Loop
// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate();


