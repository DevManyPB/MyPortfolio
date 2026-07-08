/* ======================================================
   DevManyPB — Three.js 3D Scene (Optimized)
   ====================================================== */

import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const container = document.getElementById('three-canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x030306, 0.012);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 50);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.powerPreference = 'high-performance';
container.appendChild(renderer.domElement);

// === Lighting ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.08);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00f3ff, 2, 80);
pointLight.position.set(0, 0, 20);
scene.add(pointLight);

const dirLight = new THREE.DirectionalLight(0xbd00ff, 0.8);
dirLight.position.set(20, 10, -10);
scene.add(dirLight);

// === 3D Text ===
let textMesh;
const textGroup = new THREE.Group();
scene.add(textGroup);

const loader = new FontLoader();
loader.load('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json', function (font) {
    const isPhone = window.innerWidth <= 480;
    const isTablet = window.innerWidth <= 768;
    const size = isPhone ? 1.8 : (isTablet ? 3.0 : 6);

    const textGeo = new TextGeometry('DevManyPB', {
        font: font,
        size: size,
        height: 1.2,
        curveSegments: 8,  // reduced from 12
        bevelEnabled: true,
        bevelThickness: 0.15,
        bevelSize: 0.08,
        bevelOffset: 0,
        bevelSegments: 3   // reduced from 5
    });

    textGeo.computeBoundingBox();
    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
    textGeo.translate(centerOffset, 2, 0);

    const matFront = new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        metalness: 0.4,
        roughness: 0.15,
        emissive: 0x00d4ff,
        emissiveIntensity: 0.35
    });
    const matSide = new THREE.MeshStandardMaterial({
        color: 0xbd00ff,
        metalness: 0.7,
        roughness: 0.25,
        emissive: 0xbd00ff,
        emissiveIntensity: 0.5
    });

    textMesh = new THREE.Mesh(textGeo, [matFront, matSide]);
    textGroup.add(textMesh);
});

// === Floating wireframe shapes (reduced count) ===
const shapesGroup = new THREE.Group();
scene.add(shapesGroup);

// Reuse a single geometry per type
const shapeGeos = [
    new THREE.TorusGeometry(1.2, 0.3, 8, 24),
    new THREE.IcosahedronGeometry(1.2, 0),
    new THREE.OctahedronGeometry(1.2, 0)
];
const shapeMat = new THREE.MeshBasicMaterial({  // BasicMaterial — no lighting calc = faster
    color: 0xbd00ff,
    wireframe: true,
    transparent: true,
    opacity: 0.12
});

for (let i = 0; i < 8; i++) {  // reduced from 12
    const geo = shapeGeos[Math.floor(Math.random() * shapeGeos.length)];
    const mesh = new THREE.Mesh(geo, shapeMat);
    mesh.position.set(
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40 - 15
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    mesh.userData = {
        rx: (Math.random() - 0.5) * 0.005,
        ry: (Math.random() - 0.5) * 0.005
    };
    shapesGroup.add(mesh);
}

// === Particles (Roblox Logos) ===
function createRobloxLogoTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Draw simplified Roblox Logo
    ctx.translate(64, 64);
    ctx.rotate(0.25); // Slight tilt
    ctx.fillStyle = '#ffffff';
    // Outer square
    ctx.fillRect(-45, -45, 90, 90);
    // Inner square (hole)
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillRect(-15, -15, 30, 30);
    
    return new THREE.CanvasTexture(canvas);
}

const particlesCount = 350; // Increased count to cover full page height
const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i * 3] = (Math.random() - 0.5) * 160;     // X spread
    posArray[i * 3 + 1] = (Math.random() - 0.5) * 200; // Y spread (taller)
    posArray[i * 3 + 2] = (Math.random() - 0.5) * 100; // Z spread
}
const particlesGeo = new THREE.BufferGeometry();
particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMat = new THREE.PointsMaterial({
    size: 2.5, // Much larger to show the logo
    color: 0x00f3ff,
    transparent: true,
    opacity: 0.35,
    map: createRobloxLogoTexture(),
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
scene.add(particlesMesh);

// === Mouse tracking (cached values) ===
let mouseX = 0;
let mouseY = 0;
let cachedScrollY = 0;

document.addEventListener('mousemove', (event) => {
    const wHalf = window.innerWidth / 2;
    const hHalf = window.innerHeight / 2;
    mouseX = (event.clientX - wHalf) * 0.001;
    mouseY = (event.clientY - hHalf) * 0.001;

    // Move point light to follow cursor in 3D space
    const vec = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
    );
    vec.unproject(camera);
    const dir = vec.sub(camera.position).normalize();
    const dist = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(dist));
    pointLight.position.x = pos.x;
    pointLight.position.y = pos.y;
}, { passive: true });

// Cache scroll position (avoid layout thrashing)
window.addEventListener('scroll', () => { cachedScrollY = window.scrollY; }, { passive: true });

// === Animation Loop ===
const clock = new THREE.Clock();
function animate3D() {
    requestAnimationFrame(animate3D);

    // Removed throttle so particles animate globally across all sections

    const time = clock.getElapsedTime();
    const targetX = mouseX * 0.5;
    const targetY = mouseY * 0.5;

    // Animate 3D text
    if (textMesh) {
        textGroup.rotation.y += 0.04 * (targetX - textGroup.rotation.y);
        textGroup.rotation.x += 0.04 * (targetY - textGroup.rotation.x);
        textGroup.position.y = (Math.sin(time * 1.2) * 0.6) + (cachedScrollY * 0.025);
    }

    // Slow particle rotation
    particlesMesh.rotation.y = time * 0.02;
    particlesMesh.rotation.x = time * 0.008;

    // Animate floating shapes
    shapesGroup.children.forEach(mesh => {
        mesh.rotation.x += mesh.userData.rx;
        mesh.rotation.y += mesh.userData.ry;
    });
    shapesGroup.position.y = cachedScrollY * 0.012;

    // Camera parallax (follows mouse)
    camera.position.x += (mouseX * 12 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 12 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}
animate3D();

// === Resize handler (debounced) ===
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, 150);
});
