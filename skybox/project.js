const stats = initStats();
const scene = new THREE.Scene();
const renderer = createRenderer();
const camera = setUpCamera(renderer);
const skybox = createSkybox();


scene.add(skybox);

animate();



// infinite animation loop which makes renderer to draw the scene 60 fps
function animate() {
    stats.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
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

function createSkybox() {
    let geometry = new THREE.CubeGeometry(1000, 1000, 1000);
    
    let materials = [
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/rt.jpg"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/lt.jpg"), side: THREE.DoubleSide }),        
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/up.jpg"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/dn.jpg"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/fr.jpg"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/bk.jpg"), side: THREE.DoubleSide })
    ]
    let material =  new THREE.MeshFaceMaterial(materials);
    let skybox = new THREE.Mesh(geometry, material);
    return skybox;
};

function setUpCamera(renderer) {
    let camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 1;
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    return camera;
};