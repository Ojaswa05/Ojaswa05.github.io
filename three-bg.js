// 3D Three.js Interactive Particle Field & Floating Geometric Wireframe
const canvas = document.getElementById('webgl-canvas');

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 1. Particle Cloud Stars
const particleCount = 1200;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

const colorCyan = new THREE.Color('#00f2fe');
const colorPurple = new THREE.Color('#9d4edd');
const colorBlue = new THREE.Color('#4facfe');

for (let i = 0; i < particleCount * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 120;
  positions[i + 1] = (Math.random() - 0.5) * 120;
  positions[i + 2] = (Math.random() - 0.5) * 120;

  const mixedColor = Math.random() > 0.5 ? colorCyan : (Math.random() > 0.5 ? colorPurple : colorBlue);
  colors[i] = mixedColor.r;
  colors[i + 1] = mixedColor.g;
  colors[i + 2] = mixedColor.b;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleMaterial = new THREE.PointsMaterial({
  size: 0.35,
  vertexColors: true,
  transparent: true,
  opacity: 0.8
});

const particles = new THREE.Points(geometry, particleMaterial);
scene.add(particles);

// 2. Floating 3D Geometric Torus Knot & Icosahedron Wireframes
const torusGeometry = new THREE.TorusKnotGeometry(8, 2.2, 100, 16);
const torusMaterial = new THREE.MeshBasicMaterial({
  color: 0x4facfe,
  wireframe: true,
  transparent: true,
  opacity: 0.15
});
const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
torusKnot.position.set(25, -5, -15);
scene.add(torusKnot);

const icoGeometry = new THREE.IcosahedronGeometry(7, 1);
const icoMaterial = new THREE.MeshBasicMaterial({
  color: 0x9d4edd,
  wireframe: true,
  transparent: true,
  opacity: 0.2
});
const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
icosahedron.position.set(-25, 10, -10);
scene.add(icosahedron);

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

window.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
  mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
});

// Window resize listener
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  // Smooth mouse inertia
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  particles.rotation.y = elapsedTime * 0.04 + targetX * 2;
  particles.rotation.x = elapsedTime * 0.02 + targetY * 2;

  torusKnot.rotation.x = elapsedTime * 0.15;
  torusKnot.rotation.y = elapsedTime * 0.2;

  icosahedron.rotation.x = -elapsedTime * 0.12;
  icosahedron.rotation.z = elapsedTime * 0.18;

  renderer.render(scene, camera);
}

animate();
