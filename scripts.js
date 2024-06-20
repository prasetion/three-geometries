import * as THREE from "three";
import { Wireframe } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// canvas
const canvas = document.querySelector("canvas.webgl");

// cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  console.log(cursor.x, cursor.y);
});

// scene
const scene = new THREE.Scene();

// object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// const geometry = new THREE.SphereGeometry(1, 8, 8);
const geometry = new THREE.BufferGeometry();
// const positionsArray = new Float32Array([
//   0,
//   0,
//   0, // First vertex
//   0,
//   1,
//   0, // Second vertex
//   1,
//   0,
//   0, // Third vertex
// ]);

// create 50 triangle (450 values)
const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < positionsArray.length; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}

const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// sizes
const sizes = {
  width: 800,
  height: 600,
};

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.z = 3;
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

const tick = () => {
  // update controls
  controls.update();

  // render per frame
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
