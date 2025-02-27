//Need the create a fuction that can read a obj file then displays it on the website.

// Handle action buttons
function handleAction(action) {
    console.log(`${action} button clicked`);
}

// Handle manual controls
function handleControl(direction) {
    console.log(`Manual control: ${direction}`);
}

// Webcam integration
const webcam = document.getElementById('webcam');
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => { 
        webcam.srcObject = stream; 
    })
    .catch(error => {
        console.error("Error accessing webcam:", error);
    });

// Track mouse position
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Update the position on the sidebar
    document.getElementById('position').textContent = `X: ${mouseX}, Y: ${mouseY}, Z: 0`;
});

// Three.js setup for the 3D model
const modelContainer = document.getElementById('model-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, modelContainer.offsetWidth / modelContainer.offsetHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(modelContainer.offsetWidth, modelContainer.offsetHeight);
modelContainer.appendChild(renderer.domElement);

// Add a grid helper and axes helper for debugging
const gridHelper = new THREE.GridHelper(10, 10); // 10x10 grid
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5); // X, Y, Z axes
scene.add(axesHelper);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

// Load GLTF model
const loader = new THREE.GLTFLoader();
loader.load(
    './models/current_scan.glb', // Ensure the path is correct
    (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Adjust scale
        model.position.set(0, -1, 0); // Adjusted position for visibility
        scene.add(model);
        console.log("Model loaded successfully!");
    },
    (xhr) => {
        console.log(`Model loading: ${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
        console.error("Error loading the model:", error);
    }
);

// Adjust the camera to ensure the model is visible
camera.position.set(0, 2, 5); // Adjust camera position
camera.lookAt(0, 0, 0); // Make the camera look at the origin

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener('resize', () => {
    camera.aspect = modelContainer.offsetWidth / modelContainer.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(modelContainer.offsetWidth, modelContainer.offsetHeight);
});

// Add a test cube for debugging (optional, remove if not needed)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-1, 0.5, 0); // Adjust position for visibility
scene.add(cube);
