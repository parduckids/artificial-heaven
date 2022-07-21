import './style.css'

//import Three.js to use 3D.
import * as THREE from 'three';

//Import OrbitControls for make it interactive, control it with mouse.
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(0);
camera.position.setY(10);



const skinTexture = new THREE.TextureLoader().load('skin.jpg');
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( {map:skinTexture});
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

//use pointLight when you want to lit up a specific point.

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5);


//Lighting across the entire screen?
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight, ambientLight )

//PointLightHelper draws a wireframe for the place where the light is coming from.
const lightHelper = new THREE.PointLightHelper(pointLight)
//GridHelper draws a 2 dimensional grid on the scene
const gridHelper = new THREE.GridHelper(200,50);
// scene.add( lightHelper, gridHelper )

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24 );
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
    const star = new THREE.Mesh ( geometry, material );
    // randomly generating x, y, z position value for each star
    // fill Array with 3 values , map each value to the THREEjs random float spread function
    //which is a helper that randomly generate a number between -100 +100
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
    //Take those random numbers and set the position of the star
    star.position.set(x, y, z);
    //add a star to the scene
    scene.add(star)
}
//decide how many start to add ?
// Create an array of 200 values
//each value add star function.
//Scene should be populated with 200 randomly generated stars
Array(200).fill().forEach(addStar)


//load a simple jpeg image using threejs TextureLoader
//use a callback function to be notified when the images done loading
const cloudTexture = new THREE.TextureLoader().load('cloud.jpg');
scene.background = cloudTexture;

// Create a cube with custom texture:
// How to add custom texture from images

const skinCube = new THREE.Mesh(
    new THREE.BoxGeometry(6,6,6),
    new THREE.MeshBasicMaterial({ map:skinTexture })
);

scene.add(skinCube);

// Create Skin Moon
//using skin texture from skinCube
const paperTexture = new THREE.TextureLoader().load('paper.webp')

const skinMoon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: skinTexture,
        normalMap: paperTexture
    } )
);
const skinMoon2 = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: skinTexture,
        normalMap: paperTexture
    } )
);

//THESE ARE THE SAME JUST PREFERENCE:
//use equal sign
skinMoon.position.z = -10;
//use setter function
skinMoon.position.setX(-15);
skinMoon.position.setY(10);

//skinmoon 2
skinMoon2.position.z = 15;
//use setter function
skinMoon2.position.setX(10);


skinCube.position.x = -20;


scene.add(skinMoon);
scene.add(skinMoon2);

// move the camera with scrolling
function moveCamera() {
    //calculate where the user currently scrolled to
    //show how far are we from the top of the webpage
    const t = document.body.getBoundingClientRect().top;
    skinMoon.rotation.y += 0.03;
    skinMoon2.rotation.z -= 0.02;

    skinCube.rotation.y += 0.015;
    skinCube.rotation.x += 0.015;
    skinCube.rotation.z += 0.015;
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;

}
document.body.onscroll = moveCamera



//Set up an infinite function for render method:

function animate(){
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();


    renderer.render( scene, camera );
}

animate();

