const controls = initControls();
const stats = initStats();
const scene = new THREE.Scene();
const renderer = createRenderer();
const camera = setUpCamera(renderer);
const plane = createPlane();
const icosahedron = createIcosahedron();
const ambientLight = createAmbientLight();
const spotLight = createSpotLight();

let offset = 0;

scene.add(plane);
scene.add(icosahedron);
scene.add(ambientLight);
scene.add(spotLight);

animate();



// infinite animation loop which makes renderer to draw the scene 60 fps
function animate() {
    stats.update();
    requestAnimationFrame(animate);
    offset += controls.movingSpeed;
    icosahedron.material.color.setHex(controls.objectColor);
    icosahedron.rotation.x += controls.xRotationSpeed;
    icosahedron.rotation.z += controls.zRotationSpeed;
    icosahedron.rotation.y += controls.yRotationSpeed;
    icosahedron.position.y = 0 + ((Math.cos(offset)) / 2);
    renderer.render(scene, camera);
};

function initControls(){
    let controls = new function() {
        this.objectColor = 0x00ff00;
        this.movingSpeed = 0.05;
        this.xRotationSpeed = 0.01;
        this.yRotationSpeed = 0.03;
        this.zRotationSpeed = 0.01;
    };
    
    let gui = new dat.GUI();
    gui.add(controls, 'objectColor', 0x000000, 0xFFFFFF);
    gui.add(controls, 'movingSpeed', 0, 0.25);
    gui.add(controls, 'xRotationSpeed', 0, 0.25);
    gui.add(controls, 'yRotationSpeed', 0, 0.25);
    gui.add(controls, 'zRotationSpeed', 0, 0.25);

    return controls;
};

function initStats(){
    let stats = new Stats();
    stats.showPanel(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.dom);
    return stats;
};

function createRenderer() {
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.shadowMapEnabled = true;
    document.body.appendChild(renderer.domElement);
    return renderer;
};

function createPlane() {
    let planeGeometry = new THREE.PlaneGeometry(7, 7, 1, 1);
    let planeMaterial = new THREE.MeshLambertMaterial({ color: 0x3f3f3f });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.position.y = -5;
    plane.rotation.x = -0.5 * Math.PI;
    return plane;
};

function createAmbientLight() {
    return new THREE.AmbientLight(0x404040);
};

function createSpotLight() {
    let spotLight = new THREE.SpotLight(0xffffff, 1.2);
    spotLight.position.set(0, 10, 6);
    //spotLight.target.set(0, 5, 0);
    spotLight.castShadow = true;
    spotLight.target = icosahedron;
    return spotLight;
};

function createIcosahedron() {
    let geometry = new THREE.IcosahedronGeometry(1, 0);
    let material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    let icosahedron = new THREE.Mesh(geometry, material);
    icosahedron.castShadow = true;
    return icosahedron;
};

function setUpCamera(renderer) {
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 6;
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    return camera;
};