// 3D Rendering Engine Utilities
class RenderEngine {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.carMesh = null;
    this.loader = new THREE.GLTFLoader();
  }

  // Initialize the 3D scene
  initialize(container) {
    try {
      // Scene setup
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xf0f0f0);

      // Camera setup
      this.camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      this.camera.position.set(5, 2, 5);

      // Renderer setup
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.outputEncoding = THREE.sRGBEncoding;

      // Controls
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;

      // Lighting setup
      this.setupLighting();

      // Ground
      this.createGround();

      container.appendChild(this.renderer.domElement);
      this.animate();

      return this.renderer.domElement;
    } catch (error) {
      console.error('RenderEngine initialization error:', error);
      return null;
    }
  }

  // Setup scene lighting
  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    // Fill lights
    const fillLight1 = new THREE.DirectionalLight(0x4444ff, 0.2);
    fillLight1.position.set(-10, 5, -5);
    this.scene.add(fillLight1);

    const fillLight2 = new THREE.DirectionalLight(0xff4444, 0.15);
    fillLight2.position.set(5, 5, -10);
    this.scene.add(fillLight2);
  }

  // Create ground plane
  createGround() {
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xcccccc,
      transparent: true,
      opacity: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  // Load and display car model
  loadCarModel(modelPath, color = '#ff0000', material = 'metallic') {
    if (this.carMesh) {
      this.scene.remove(this.carMesh);
    }

    // Create simple car geometry as fallback
    this.createSimpleCarModel(color, material);
  }

  // Create simple car model
  createSimpleCarModel(color, material) {
    const carGroup = new THREE.Group();

    // Car body
    const bodyGeometry = new THREE.BoxGeometry(4, 1.2, 2);
    const bodyMaterial = this.createCarMaterial(color, material);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    body.castShadow = true;
    carGroup.add(body);

    // Car roof
    const roofGeometry = new THREE.BoxGeometry(3, 0.8, 1.8);
    const roof = new THREE.Mesh(roofGeometry, bodyMaterial);
    roof.position.y = 1.4;
    roof.castShadow = true;
    carGroup.add(roof);

    // Wheels
    this.createWheels(carGroup);

    this.carMesh = carGroup;
    this.scene.add(this.carMesh);
  }

  // Create car material based on type
  createCarMaterial(color, materialType) {
    const colorHex = new THREE.Color(color);
    
    switch (materialType) {
      case 'matte':
        return new THREE.MeshLambertMaterial({ color: colorHex });
      case 'glossy':
        return new THREE.MeshPhongMaterial({ 
          color: colorHex, 
          shininess: 100,
          specular: 0x222222
        });
      case 'metallic':
      default:
        return new THREE.MeshPhongMaterial({ 
          color: colorHex,
          shininess: 50
        });
    }
  }

  // Create wheels
  createWheels(carGroup) {
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });

    const positions = [
      [-1.5, 0.4, 0.8],
      [1.5, 0.4, 0.8],
      [-1.5, 0.4, -0.8],
      [1.5, 0.4, -0.8]
    ];

    positions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      wheel.castShadow = true;
      carGroup.add(wheel);
    });
  }

  // Update car color
  updateCarColor(color) {
    if (this.carMesh) {
      this.carMesh.traverse(child => {
        if (child.isMesh && child.material) {
          child.material.color.setHex(color.replace('#', '0x'));
        }
      });
    }
  }

  // Animation loop
  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.controls) this.controls.update();
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  // Cleanup
  dispose() {
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}