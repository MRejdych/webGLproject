const stats = initStats();
const scene = new THREE.Scene();
const plane = createPlane();
const renderer = createRenderer();
const camera = setUpCamera(renderer);
const skybox = createSkybox();
const clock = new THREE.Clock();
const ambientLight = createAmbientLight();
const spotLight = createSpotLight();
let fire = void 0;
let texture = void 0;

scene.add(skybox);
scene.add(ambientLight);
scene.add(spotLight);
scene.add(plane);

fire = addCampfire();

animate();



// infinite animation loop which makes renderer to draw the scene 60 fps
function animate() {
    stats.update();
    let delta = clock.getDelta();

    requestAnimationFrame(animate);
    fire.material.update(delta);
    renderer.render(scene, camera);
}

function initStats() {
    let stats = new Stats();
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

function createPlane(){
    let planeGeometry = new THREE.PlaneGeometry(20, 20, 10, 10);
    let planeMaterial = new THREE.MeshBasicMaterial({color: 0x003737});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = (Math.PI * 3) / 2;
    plane.position.y -= 0.2;
    return plane;
}

function createAmbientLight() {
    return new THREE.AmbientLight(0x404040);
}

function createSpotLight() {
    let spotLight = new THREE.SpotLight(0xffffff, 1.2);
    spotLight.position.set(0, 10, 6);
    spotLight.castShadow = true;
    return spotLight;
}

function createSkybox() {
    let geometry = new THREE.CubeGeometry(100, 100, 100);

    let materials = [
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("img/arrakisday_ft.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("img/arrakisday_bk.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("img/arrakisday_up.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("img/arrakisday_dn.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("img/arrakisday_rt.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("img/arrakisday_lf.png"), side: THREE.DoubleSide })
    ];
    let material = new THREE.MeshFaceMaterial(materials);
    let skybox = new THREE.Mesh(geometry, material);
    //skybox.position.y += 49.9;
    return skybox;
}

function setUpCamera(renderer) {
    let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 10;
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
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