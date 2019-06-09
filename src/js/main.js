var THREE = window.THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
var Stats = require('stats-js');
require('three/examples/js/loaders/GLTFLoader');

var tourExperience = {
    vars: {
        threeObj: [],
        threeTxt: [],
        threeOrbit: [],
        scene: new THREE.Scene(),
        objLoader: new THREE.GLTFLoader(),
        fontLoader: new THREE.FontLoader(),
        textGroup: new THREE.Group(),
        camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
        renderer: new THREE.WebGLRenderer({alpha: true, antialias: true}),
        fps: new Stats(),
        clock: new THREE.Clock,
        textFont: 'src/fonts/criteria-thin.json',
        text: 'text'
    },
    sceneFloor: function (width, height, color, wireframe) {
        var geometry = new THREE.PlaneGeometry(width, height, 50, 50);
        var material = new THREE.MeshPhongMaterial({color: color, shininess: 100, side: THREE.DoubleSide, wireframe: wireframe });

        var sceneWrapp = new THREE.Mesh(geometry, material);
        sceneWrapp.rotation.x = Math.PI / 2;
        sceneWrapp.position.y = -5;

        this.vars.scene.add(sceneWrapp);
    },
    objTexture: function (color, wireframe) {
        return new THREE.MeshStandardMaterial({color: color, metalness: 0, side: THREE.DoubleSide, wireframe: wireframe })
    },
    ojbLoader: function (object) {
        this.vars.objLoader.load( object, function ( gltf ) {
            var model = gltf.scene;
            var wireframe = false;
            model.traverse (i => {
                if (i.isMesh) {
                    switch (i.name) {
                        case 'Speaker2':
                            i.material = new myObjectTexture('#0082F0', wireframe);
                            break;
                    }
                    // threeObj.push(i);
                }
            });
            threeObj.push(model);
            scene.add( model);

        }, undefined, function ( error ) {

            console.error( error );

        });
    },
    showFPS: function () {
        this.vars.fps.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( this.vars.fps.dom );
    },
    minMax: function (min, max) {
        return Math.random() * (max - min) + min;
    },
    fontLoad: function (textFont, textContent, size, posX, posY, posZ) {
        var $that = this;
        this.vars.fontLoader.load( textFont, function (font) {
            var textGeometry = new THREE.TextGeometry( textContent, {
                font: font,
                size: size,
                height: 0.5,
                curveSegments: 0,
                bevelEnabled: true,
                bevelThickness: 0,
                bevelSize: 0,
                bevelOffset: 0,
                bevelSegments: 0
            });
            var textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff});
            var mesh = new THREE.Mesh( textGeometry, textMaterial);
            mesh.position.set(posX,posY,posZ);
            mesh.name = `text-${textContent}`;
            mesh.castShadow = true;
            mesh.receiveShadow = false;
            $that.vars.textGroup.add(mesh);
        });
        this.vars.scene.add(this.vars.textGroup);
        this.vars.threeTxt.push(this.vars.textGroup);
    },
    onMouseClick: function (e) {
        var raycaster = new THREE.Raycaster();
        raycaster.far = 170;
        raycaster.near = 135;
        var mouse = new THREE.Vector2();

        e.preventDefault();

        mouse.x = ( e.clientX / tourExperience.vars.renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( e.clientY / tourExperience.vars.renderer.domElement.clientHeight ) * 2 + 1;

        raycaster.setFromCamera( mouse, tourExperience.vars.camera );

        var intersects = raycaster.intersectObjects( tourExperience.vars.scene.children );
        if ( intersects.length > 0 ) {
            tourExperience.vars.thundeTime = 20;
        }
    },
    onWindowResize: function () {
        tourExperience.vars.camera.aspect = window.innerWidth / window.innerHeight;
        tourExperience.vars.camera.updateProjectionMatrix();
        tourExperience.vars.renderer.setSize( window.innerWidth, window.innerHeight );
    },
    cameraInit: function () {
        this.vars.camera.position.z = 100;
        this.vars.camera.position.set(0, 80, -140);

        var controls = new OrbitControls( this.vars.camera );
        var center = new THREE.Vector3();

        controls.enableDamping = true;
        controls.dampingFactor = 0.5;
        // controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        controls.maxPolarAngle = Math.PI/2;
        controls.maxDistance = 300;
        controls.enablePan = false;
        center.z = -500;

        controls.update();
        this.vars.threeOrbit.push(controls);
    },
    lightPoint: function (color, intensity, distance, decay, posX, posY, posZ) {
        var light = new THREE.PointLight(color, intensity,distance, decay);
        light.position.set(posX, posY, posZ);
        this.vars.scene.add(light);
    },
    lightHemisphere: function (sky, ground, intensity) {
        var hemiLight = new THREE.HemisphereLight( sky, ground, intensity );
        this.vars.scene.add( hemiLight );
    },
    renderInit: function () {
        this.vars.renderer.setSize(window.innerWidth, window.innerHeight);
        this.vars.renderer.setPixelRatio( window.devicePixelRatio );
        document.body.appendChild(this.vars.renderer.domElement);
    },
    mainLoop: function() {
        tourExperience.vars.fps.update();
        tourExperience.vars.threeOrbit[0].update();
        tourExperience.vars.renderer.render(tourExperience.vars.scene, tourExperience.vars.camera);
        requestAnimationFrame(tourExperience.mainLoop);
    },
    evenListeners: function () {
        var $that = this;
        window.addEventListener( 'resize', $that.onWindowResize, false );
        document.addEventListener( 'click', $that.onMouseClick, false);
    },
    init: function () {
        this.renderInit();
        this.cameraInit();
        this.lightPoint(0xffffff, 1, 1000, 0, 1, 1, 100);
        this.lightHemisphere('silver', 'black', 1);
        this.sceneFloor(1000, 1000, 'blue', false);
        // this.fontLoad(this.vars.textFont, this.vars.text, 9, -100, 30, 3);
        this.evenListeners();
        this.showFPS();
    }
}

tourExperience.init();
tourExperience.mainLoop();
