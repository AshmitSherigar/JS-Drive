import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { add, log } from 'three/tsl';

const colorInput = document.querySelector("#colorInput")
const buttonX = document.querySelector("#rotateX")
const buttonY = document.querySelector("#rotateY")
const buttonZ = document.querySelector("#rotateZ")
function rotateX() {
    model.rotation.x += 0.1
}
function rotateY() {
    model.rotation.y += 0.1
}
function rotateZ() {
    model.rotation.z += 0.1
}
function runInput() {
    const color = colorInput.value
    if (CSS.supports("color", color) && color.length >= 3) {
        console.log(color);
        model.material.color.set(color);
        colorInput.style.color = color

    }
    else {
        console.log("enter a valid color");

    }
}
function clearColor() {

    model.material.color.set(0xffffff);
    colorInput.value = ''
    colorInput.style.color = "black"


}
let geometries = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(0.7, 32, 32),
    new THREE.CapsuleGeometry(1, 1, 40, 80)
];
let currentGeometryIndex = 0
function switchModel() {


    currentGeometryIndex = (currentGeometryIndex + 1) % geometries.length;

    model.geometry.dispose();
    model.geometry = geometries[currentGeometryIndex];


}
buttonX.addEventListener("click", rotateX)
buttonY.addEventListener("click", rotateY)
buttonZ.addEventListener("click", rotateZ)




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);



const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 1 });
const model = new THREE.Mesh(geometries[currentGeometryIndex], material);
scene.add(model);

camera.position.z = 5;


const div = document.querySelector(".display");
const { clientWidth, clientHeight } = div;


const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);

directionalLight.position.set(3, 3, 3);
directionalLight2.position.set(-3, -3, -3);

directionalLight.castShadow = true;
// const helper =new  THREE.DirectionalLightHelper(directionalLight , 2)
// const helper2 =new  THREE.DirectionalLightHelper(directionalLight2 , 2)

// scene.add(helper)
// scene.add(helper2)

scene.add(directionalLight);
scene.add(directionalLight2);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(clientWidth, clientHeight);
div.appendChild(renderer.domElement);

camera.aspect = clientWidth / clientHeight;
camera.updateProjectionMatrix();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true
controls.dampingFactor = 0.01

function animate() {
    // model.rotation.x += 0.01;
    // model.rotation.y += 0.01;

    controls.update()
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
    const { clientWidth, clientHeight } = div;
    renderer.setSize(clientWidth, clientHeight);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
});




let isAnimating = false;

function playAnimation(condition) {
    if (condition === "start") {
        isAnimating = true;
        animateModel();
    } else {
        isAnimating = false;
        model.position.set(0, 0, 0);
    }
}
let scaleDirection = 1
function animateModel() {
    if (!isAnimating) return;
    model.scale.x += 0.005 * scaleDirection;
    model.scale.y += 0.005 * scaleDirection;
    model.scale.z += 0.005 * scaleDirection;
    if (model.scale.x > 1.2 || model.scale.x < 0.8) {
        scaleDirection *= -1;
    }

    requestAnimationFrame(animateModel);
}




document.getElementById("saveImage").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = renderer.domElement.toDataURL("image/png");
    link.download = "3D_Model.png";
    link.click();
    console.log('done');

});


console.log(model);
window.playAnimation = playAnimation
window.switchModel = switchModel
window.clearColor = clearColor
window.runInput = runInput


