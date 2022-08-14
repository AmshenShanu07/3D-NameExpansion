import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cartoonTexture = textureLoader.load('/textures/matcaps/8.png');

const fontLoader = new FontLoader();
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font)=>{
        const material = new THREE.MeshMatcapMaterial({matcap:cartoonTexture})
        const textGeometry = new TextGeometry("Amshen Yesudas !",
            {
                font,
                size:0.5,
                height:0.2,
                curveSegments:3,
                bevelEnabled:true,
                bevelThickness:0.03,
                bevelSize:0.02,
                bevelOffset:0,
                bevelSegments:3
            })
        const text = new THREE.Mesh(
            textGeometry,
            material
        )
        
        textGeometry.center();

        scene.add(text)
        
        const torusGeometry = new THREE.TorusGeometry(0.3,0.2,20,45);
        const cubeGeometry = new THREE.BoxGeometry(0.5,0.5,0.5);
        const sphereGeometry = new THREE.SphereGeometry(0.2);

        for(var i = 0;i < 100; i ++){
            const torusMesh = new THREE.Mesh(torusGeometry,material)
            torusMesh.position.x = (Math.random()-0.5) * 10;
            torusMesh.position.y = (Math.random()-0.5) * 10;
            torusMesh.position.z = (Math.random()-0.5) * 10;

            torusMesh.rotation.x = Math.random() * Math.PI;
            torusMesh.rotation.y = Math.random() * Math.PI;
            const scale = Math.random()
            torusMesh.scale.set(scale,scale,scale)
            scene.add(torusMesh)
        }

        for(var i = 0;i < 50; i ++){
            const cubeMesh = new THREE.Mesh(cubeGeometry,material)
            cubeMesh.position.x = (Math.random()-0.5) * 10;
            cubeMesh.position.y = (Math.random()-0.5) * 10;
            cubeMesh.position.z = (Math.random()-0.5) * 10;

            cubeMesh.rotation.x = Math.random() * Math.PI;
            cubeMesh.rotation.y = Math.random() * Math.PI;
            scene.add(cubeMesh)
        }
        for(var i = 0;i < 50; i ++){
            const sphereMesh = new THREE.Mesh(sphereGeometry,material)
            sphereMesh.position.x = (Math.random()-0.5) * 10;
            sphereMesh.position.y = (Math.random()-0.5) * 10;
            sphereMesh.position.z = (Math.random()-0.5) * 10;
            scene.add(sphereMesh)
        }
    }
    );

/**
 * Object
 */

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 7
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.maxDistance = 8
controls.minDistance = 3;
controls.enablePan = false;
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()