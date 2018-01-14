function createFireGeometry() {
    let geometry = new THREE.BufferGeometry();

    let fireRadius = 0.5;
    let fireHeight = 3;
    let particleCount = 1000;


    let halfHeight = fireHeight * 0.5;
    let position = new Float32Array(particleCount * 3);
    let random = new Float32Array(particleCount);
    let sprite = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {

        let r = Math.sqrt(Math.random()) * fireRadius;
        let angle = Math.random() * 2 * Math.PI;
        position[i * 3 + 0] = Math.cos(angle) * r;
        position[i * 3 + 1] = (fireRadius - r) / fireRadius * halfHeight + halfHeight;
        position[i * 3 + 2] = Math.sin(angle) * r;
        sprite[i] = 0.25 * (Math.random() * 4 | 0);
        random[i] = Math.random();
    }

    geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));
    geometry.addAttribute('random', new THREE.BufferAttribute(random, 1));
    geometry.addAttribute('sprite', new THREE.BufferAttribute(sprite, 1));


    return geometry;
}


function createFireMaterial(camera, height) {
    let texture = new THREE.TextureLoader().load("img/fire.png");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    let uniforms = {
        color: {type: "c", value: new THREE.Color(0xff2200)},
        size: {type: "f", value: 0.8},
        texture: {type: "t", value: texture},
        time: {type: "f", value: 0.0},
        heightOfNearPlane: {type: "f", value: Math.abs(height / (2 * Math.tan(THREE.Math.degToRad(camera.fov / 2))))}
    };

    let vertexShader = [
        'attribute float random, sprite;',
        'uniform float time, size, heightOfNearPlane;',
        'varying float vSprite, vOpacity;',
        'float PI = 3.14;',

        'float to4thPower( float t ) {',
            'return t * t * t * t;',
        '}',

        'void main() {',
            'float progress = fract(time + (2.0 * random - 1.0));',
            'float ease = to4thPower(progress);',
            'vec3 newPosition = position * vec3(1.0, ease, 1.0);',
            'gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);',
            'gl_PointSize = (heightOfNearPlane * size) / gl_Position.w;',
            'vOpacity = min(sin(PI * ease) * 3.0, 1.0) * (1.0 - (progress/1.2));',
            'vSprite = sprite;',
        '}'

    ].join('\n');

    let fragmentShader = [
        'uniform vec3 color;',
        'uniform sampler2D texture;',
        'varying float vSprite, vOpacity;',
        'void main() {',
            'vec2 texCoord = vec2(gl_PointCoord.x * 0.25 + vSprite, gl_PointCoord.y);',
            'gl_FragColor = vec4(texture2D( texture, vec2(texCoord)).xyz * color * vOpacity, 1.0);',
        '}'

    ].join('\n');

    let fireMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true
    });

    fireMaterial.update = function (delta) {
        this.uniforms.time.value += delta;
    };
    return fireMaterial;
}