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
        camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000),
        renderer: new THREE.WebGLRenderer({alpha: true, antialias: true}),
        fps: new Stats(),
        clock: new THREE.Clock,
        obj: 'src/obj/building.gltf',
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
        return new THREE.MeshPhongMaterial({color: color, reflectivity: 100, side: THREE.DoubleSide, wireframe: wireframe })
    },
    ojbLoader: function (object) {
        var $that = this;
        this.vars.objLoader.load( object, function ( gltf ) {
            var model = gltf.scene;
            model.castShadow = true;
            var wireframe = false;
            model.position.set(2250, -5, 900)
            model.traverse (i => {
                if (i.isMesh) {
                    i.scale.set(3,3,3)
                    i.material = new $that.objTexture('#0082F0', wireframe);
                }
            });
            $that.vars.threeObj.push(model);
            $that.vars.scene.add( model);
            $that.vars.threeObj[0].children.sort((a, b) => a.name.localeCompare(b.name))
            $that.vars.threeObj[0].children.forEach( ( el,index ) => {
                //windows
                if ( index >= 253 ) {
                    el.material.color.set('white');
                }
                // 3 floor steps
                if ( index >= 62 && index <= 65  ) {
                    el.material.color.set('black');
                }
                // circles on antenas
                if ( index <= 61 ) {
                    el.material.color.set('blue');
                }
                if ( index >= 66 && index <= 71 ) {
                    el.material.color.set('blue');
                }
                // radio dish
                if ( index >= 72 && index <= 73 ) {
                    el.material.color.set('blue');
                }
                // antena base
                if ( index >= 74 && index <= 74 ) {
                    el.material.color.set('silver');
                }
                // mid of mid building
                if ( index >= 75 && index <= 75 ) {
                    el.material.color.set('black');
                }
                // radio dish
                if ( index >= 76 && index <= 76 ) {
                    el.material.color.set('blue');
                }
                // antena base
                if ( index >= 77 && index <= 77 ) {
                    el.material.color.set('silver');
                }
                // building top
                if ( index >= 78 && index <= 78 ) {
                    el.material.color.set('silver');
                }
                // radio dish
                if ( index >= 79 && index <= 79 ) {
                    el.material.color.set('blue');
                }
                // antena base
                if ( index >= 80  && index <= 80  ) {
                    el.material.color.set('silver');
                }
                // radio dish
                if ( index >= 81  && index <= 81  ) {
                    el.material.color.set('blue');
                }
                // antena base
                if ( index >= 82  && index <= 82  ) {
                    el.material.color.set('silver');
                }
                // radio dish
                if ( index >= 83  && index <= 84  ) {
                    el.material.color.set('blue');
                }
                // mid of skyscrapper
                if ( index >= 85  && index <= 85  ) {
                    el.material.color.set('black');
                }
                // radio dish
                if ( index >= 86  && index <= 86  ) {
                    el.material.color.set('blue');
                }
                // antena base
                if ( index >= 87  && index <= 87  ) {
                    el.material.color.set('silver');
                }
                // building top
                if ( index >= 88  && index <= 88  ) {
                    el.material.color.set('silver');
                }
                // radio dish
                if ( index >= 89  && index <= 92  ) {
                    el.material.color.set('blue');
                }
                // antena base
                if ( index >= 93  && index <= 93  ) {
                    el.material.color.set('silver');
                }
                // building top
                if ( index >= 94  && index <= 94  ) {
                    el.material.color.set('silver');
                }
                // radio dish
                if ( index >= 95  && index <= 95  ) {
                    el.material.color.set('blue');
                }
                // building bottom
                if ( index >= 96  && index <= 96  ) {
                    el.material.color.set('silver');
                }
                // antena base
                if ( index >= 97  && index <= 97  ) {
                    el.material.color.set('silver');
                }
                // building base
                if ( index >= 98  && index <= 99  ) {
                    el.material.color.set('silver');
                }
                // antena base
                if ( index >= 100  && index <= 101  ) {
                    el.material.color.set('silver');
                }
                // skyscrapper wrapper
                if ( index >= 102  && index <= 102  ) {
                    el.material.color.set('silver');
                }
                //  building bottom + building top
                if ( index >= 103  && index <= 105  ) {
                    el.material.color.set('silver');
                }
                //  skyscrapper window wrapp
                if ( index >= 106  && index <= 106  ) {
                    el.material.color.set('silver');
                }
                //  building top
                if ( index >= 107  && index <= 107  ) {
                    el.material.color.set('silver');
                }

            //     if ( index >= 182 & index <= 211 ) {
            //         el.material.color.set('white');
            //     }
            //     if ( index >= 182 & index <= 211 ) {
            //         el.material.color.set('white');
            //     }
            //     //road
            //     if ( index <= 1 ) {
            //         el.material.color.set('silver');
            //     }

            });
            console.log($that.vars.threeObj[0].children);
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
        // raycaster.far = 170;
        // raycaster.near = 135;
        var mouse = new THREE.Vector2();

        e.preventDefault();

        mouse.x = ( e.clientX / tourExperience.vars.renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( e.clientY / tourExperience.vars.renderer.domElement.clientHeight ) * 2 + 1;

        raycaster.setFromCamera( mouse, tourExperience.vars.camera );

        var intersects = raycaster.intersectObjects( tourExperience.vars.scene.children );
        if ( intersects.length > 0 ) {
            console.log(intersects)
        }
    },
    onWindowResize: function () {
        tourExperience.vars.camera.aspect = window.innerWidth / window.innerHeight;
        tourExperience.vars.camera.updateProjectionMatrix();
        tourExperience.vars.renderer.setSize( window.innerWidth, window.innerHeight );
    },
    cameraInit: function () {
        this.vars.camera.position.z = 100;
        this.vars.camera.position.set(300, 400, -640);

        var controls = new OrbitControls( this.vars.camera );
        var center = new THREE.Vector3();

        controls.enableDamping = true;
        controls.dampingFactor = 0.5;
        // controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        controls.maxPolarAngle = Math.PI/2;
        controls.maxDistance = 1000;
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
        this.lightPoint(0xffffff, 1, 1000, 0, 1, 100, 1);
        this.lightHemisphere('silver', 'black', 1);
        this.sceneFloor(2000, 2000, 'blue', false);
        this.ojbLoader(this.vars.obj);
        // this.fontLoad(this.vars.textFont, this.vars.text, 9, -100, 30, 3);
        this.evenListeners();
        this.showFPS();
        console.log(this.vars.threeObj[0]);

    }
}

tourExperience.init();
tourExperience.mainLoop();
