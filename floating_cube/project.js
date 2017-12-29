const controls = initControls();
const stats = initStats();
const scene = new THREE.Scene();
const renderer = createRenderer();
const camera = setUpCamera(renderer);
const plane = createPlane();
const cube = createCube();
const ambientLight = createAmbientLight();
const spotLight = createSpotLight();

let offset = 0;

scene.add(plane);
scene.add(cube);
scene.add(ambientLight);
scene.add(spotLight);

animate();



// infinite animation loop which makes renderer to draw the scene 60 fps
function animate() {
    stats.update();
    requestAnimationFrame(animate);
    offset += controls.movingSpeed;
    cube.material.color.setHex(controls.cubeColor);
    cube.rotation.x += controls.xRotationSpeed;
    cube.rotation.z += controls.zRotationSpeed;
    cube.rotation.y += controls.yRotationSpeed;
    cube.position.y = 0 + ((Math.cos(offset)) / 2);
    renderer.render(scene, camera);
};

function initControls(){
    let controls = new function() {
        this.cubeColor = 0x00ff00;
        this.movingSpeed = 0.05;
        this.xRotationSpeed = 0.01;
        this.yRotationSpeed = 0.03;
        this.zRotationSpeed = 0.01;
    }
    
    let gui = new dat.GUI();
    gui.add(controls, 'cubeColor', 0x000000, 0xFFFFFF)
    gui.add(controls, 'movingSpeed', 0, 0.25)
    gui.add(controls, 'xRotationSpeed', 0, 0.25)
    gui.add(controls, 'yRotationSpeed', 0, 0.25)
    gui.add(controls, 'zRotationSpeed', 0, 0.25)

    return controls;
}

function initStats(){
    var stats = new Stats();
    stats.showPanel(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.dom);
    return stats;
}

function createRenderer() {
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.shadowMapEnabled = true;
    document.body.appendChild(renderer.domElement);
    return renderer;
}

function createPlane() {
    let planeGeometry = new THREE.PlaneGeometry(7, 7, 1, 1);
    let planeMaterial = new THREE.MeshLambertMaterial({ color: 0x3f3f3f });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.position.y = -5;
    plane.rotation.x = -0.5 * Math.PI;
    return plane;
}

function createAmbientLight() {
    return new THREE.AmbientLight(0x404040);
}

function createSpotLight() {
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 10, 0);
    spotLight.castShadow = true;
    spotLight.target = cube;
    return spotLight;
}

function createCube() {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    let cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    return cube;
};

function setUpCamera(renderer) {
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 6;
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    return camera;
}