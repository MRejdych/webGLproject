const tree1 = new Tree(
    {
        "seed": 499,
        "segments": 8,
        "levels": 5,
        "vMultiplier": 1,
        "twigScale": 0.28,
        "initalBranchLength": 0.5,
        "lengthFalloffFactor": 0.98,
        "lengthFalloffPower": 1.08,
        "clumpMax": 0.414,
        "clumpMin": 0.282,
        "branchFactor": 2.2,
        "dropAmount": 0.24,
        "growAmount": 0.044,
        "sweepAmount": 0,
        "maxRadius": 0.096,
        "climbRate": 0.39,
        "trunkKink": 0,
        "treeSteps": 5,
        "taperRate": 0.958,
        "radiusFalloffRate": 0.71,
        "twistRate": 2.97,
        "trunkLength": 1.95,
        "trunkMaterial": "TrunkType2",
        "twigMaterial": "BranchType1"
    });

const tree2 = new Tree(
    {
        "seed": 267,
        "segments": 8,
        "levels": 4,
        "vMultiplier": 0.96,
        "twigScale": 0.71,
        "initalBranchLength": 0.12,
        "lengthFalloffFactor": 1,
        "lengthFalloffPower": 0.7,
        "clumpMax": 0.556,
        "clumpMin": 0.404,
        "branchFactor": 3.5,
        "dropAmount": 0.18,
        "growAmount": -0.108,
        "sweepAmount": 0.01,
        "maxRadius": 0.139,
        "climbRate": 0.419,
        "trunkKink": 0.093,
        "treeSteps": 5,
        "taperRate": 0.947,
        "radiusFalloffRate": 0.73,
        "twistRate": 3.53,
        "trunkLength": 1.75,
        "trunkMaterial": "TrunkType3",
        "twigMaterial": "BranchType4"
    });


// Helper function to transform the vertices and faces
function newTreeGeometry(tree, isTwigs) {
    var output = new THREE.Geometry();

    tree[isTwigs ? 'vertsTwig' : 'verts'].forEach(function (v) {
        output.vertices.push(new THREE.Vector3(v[0], v[1], v[2]));
    });

    var uv = isTwigs ? tree.uvsTwig : tree.UV;
    tree[isTwigs ? 'facesTwig' : 'faces'].forEach(function (f) {
        output.faces.push(new THREE.Face3(f[0], f[1], f[2]));
        output.faceVertexUvs[0].push(f.map(function (v) {
            return new THREE.Vector2(uv[v][0], uv[v][1]);
        }));
    });

    output.computeFaceNormals();
    output.computeVertexNormals(true);

    return output;
}


function loadTreeTexture(path) {
    let texture = new THREE.TextureLoader().load(path);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
}


function addTree1(scene, x, y, z) {
    addTree(tree1, scene, x, y, z);
}

function addTree2(scene, x, y, z) {
    addTree(tree2, scene, x, y, z);
}

function addTree(model, scene, x, y, z) {
    let trunkTexture = loadTreeTexture("img/trunk.png");
    let leafsTexture = loadTreeTexture("img/leafs.png");


    var trunkGeo = newTreeGeometry(model);
    var trunkMaterial = new THREE.MeshLambertMaterial({map: trunkTexture, transparent: true, side: THREE.DoubleSide});
    var trunkMesh = new THREE.Mesh(trunkGeo, trunkMaterial);
    trunkMesh.position.x = x;
    trunkMesh.position.y += (-0.15 + y);
    trunkMesh.position.z = z;
    trunkMesh.receiveShadow = true;
    trunkMesh.castShadow = true;
    scene.add(trunkMesh);

    var twigsGeo = newTreeGeometry(model, true);
    var twigsMaterial = new THREE.MeshLambertMaterial({map: leafsTexture, transparent: true, side: THREE.DoubleSide});
    var twigsMesh = new THREE.Mesh(twigsGeo, twigsMaterial);
    twigsMesh.position.x = x;
    twigsMesh.position.y += (-0.1 + y);
    twigsMesh.position.z = z;
    twigsMesh.receiveShadow = true;
    twigsMesh.castShadow = true;
    scene.add(twigsMesh);
}