const scene = createScene();
const plane = createPlane();
const renderer = createRenderer();
const camera = setUpCamera(renderer);
const clock = new THREE.Clock();
const pointLight = createPointLight();

let fire = void 0;
let texture = void 0;


scene.add(plane);
scene.add(pointLight);

fire = addCampfire();

addTree1(scene, 8, 0, 0);
addTree2(scene, 9, 0, 9);
addTree1(scene, 7, 0, 6);
addTree2(scene, 0, 0, 7);
addTree1(scene, 6, 0, 6);
addTree2(scene, -5, 0, -5);
addTree1(scene, -5, 0, 0);
addTree2(scene, -6, 0, -6);
addTree1(scene, -4, 0, -7);
addTree2(scene, -6, 0, -4);
addTree1(scene, 6, 0, -4);
addTree2(scene, 4, 0, 6);
addTree1(scene, 6, 0, 0);
addTree2(scene, 0, 0, -6);


animate();


function animate() {
    let delta = clock.getDelta();

    requestAnimationFrame(animate);
    fire.material.update(delta);
    renderer.render(scene, camera);
}

function createScene() {
    let scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 10, 30);
    return scene;
}

function createPointLight() {
    let light = new THREE.PointLight(0xdfafaf, 1, 30, 3);
    light.position.y += 3;
    //light.castShadow = true;
    return light;
}

function createRenderer() {
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.shadowMapEnabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    return renderer;
}

function createPlane() {
    let texture = new THREE.TextureLoader().load("img/ground.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(200, 200);

    let planeGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
    let planeMaterial = new THREE.MeshLambertMaterial({map: texture});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = (Math.PI * 3) / 2;
    plane.position.y -= 0.1;
    return plane;
}


function setUpCamera(renderer) {
    let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 10;
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.enableZoom = false;
    return camera;
}

function addCampfire() {
    let fire = new THREE.Points(
        createFireGeometry(),
        createFireMaterial(camera, window.innerHeight)
    );
    fire.position.y += 0.2;
    scene.add(fire);

    addWood(0);
    addWood(Math.PI / 2);
    addWood(Math.PI / 4);
    addWood(Math.PI * 3 / 4);

    return fire;
}

function addWood(rotation) {

    let wood = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 1.6, 32),
        new THREE.MeshLambertMaterial({color: 0x664613})
    );
    wood.rotation.z = Math.PI / 2;
    wood.rotation.y = rotation;
    scene.add(wood);
}