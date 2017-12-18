const THREE = require('three');


let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 3;

// infinite animation loop which makes renderer to draw the scene 60 fps
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
    renderer.render(scene, camera);
}
animate();