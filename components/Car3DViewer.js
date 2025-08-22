function Car3DViewer({ carModel, color, material, showAR, showVR }) {
  try {
    const mountRef = React.useRef(null);
    const sceneRef = React.useRef(null);
    const rendererRef = React.useRef(null);
    const carRef = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      if (!mountRef.current) return;

      // Initialize Three.js scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a0a);
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(50, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
      camera.position.set(8, 4, 8);

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      renderer.outputEncoding = THREE.sRGBEncoding;
      mountRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Controls
      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxPolarAngle = Math.PI / 2;
      controls.minDistance = 3;
      controls.maxDistance = 20;

  // Enhanced and brighter lighting setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Brighter ambient
  scene.add(ambientLight);

  // Strong key light
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2); // Increased intensity
  keyLight.position.set(12, 16, 8);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 4096;
  keyLight.shadow.mapSize.height = 4096;
  scene.add(keyLight);

  // Fill lights for vibrancy
  const fillLight1 = new THREE.DirectionalLight(0x4a90e2, 0.8); // Blue fill, brighter
  fillLight1.position.set(-14, 8, -8);
  scene.add(fillLight1);

  const fillLight2 = new THREE.DirectionalLight(0xffe066, 0.7); // Warm fill, brighter
  fillLight2.position.set(8, 10, -14);
  scene.add(fillLight2);

      // Load car model
      loadCarModel(scene, carModel, color, material);

      // Environment
      createEnvironment(scene);

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      // Cleanup
      return () => {
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    }, [carModel]);

    // Load car model function
    const loadCarModel = (scene, modelType, color, material) => {
      if (carRef.current) {
        scene.remove(carRef.current);
      }

      // Try to load a real 3D model (.glb) from assets/models/
      const glbPath = `assets/models/${modelType}.glb`;
      const loader = new THREE.GLTFLoader();
      loader.load(
        glbPath,
        (gltf) => {
          const carModel = gltf.scene;
          carModel.traverse((child) => {
            if (child.isMesh && child.material) {
              // Apply color and material customization if possible
              if (color) child.material.color.set(color);
              if (material && child.material.metalness !== undefined) {
                switch (material) {
                  case 'matte':
                    child.material.metalness = 0.1; child.material.roughness = 0.9; break;
                  case 'glossy':
                    child.material.metalness = 0.3; child.material.roughness = 0.2; break;
                  case 'pearlescent':
                    child.material.metalness = 0.1; child.material.roughness = 0.1; child.material.clearcoat = 1.0; child.material.clearcoatRoughness = 0.1; break;
                  case 'carbon':
                    child.material.metalness = 0.8; child.material.roughness = 0.2; break;
                  case 'metallic':
                  default:
                    child.material.metalness = 0.7; child.material.roughness = 0.3; break;
                }
              }
              child.castShadow = true;
              child.receiveShadow = true;
              child.material.needsUpdate = true;
            }
          });
          carModel.position.set(0, 0, 0);
          carModel.scale.set(1.5, 1.5, 1.5); // Adjust scale as needed
          carRef.current = carModel;
          scene.add(carModel);
          setIsLoading(false);
        },
        undefined,
        (error) => {
          // If .glb file not found, fall back to primitive geometry
          const carGroup = new THREE.Group();
          // Car body with rounded edges
          const bodyGeometry = new THREE.BoxGeometry(4.5, 1.4, 2.2, 2, 2, 2);
          const bodyMaterial = createCarMaterial(color, material);
          const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
          body.position.y = 0.7;
          body.castShadow = true;
          carGroup.add(body);
          // Car roof
          const roofGeometry = new THREE.BoxGeometry(3.2, 0.9, 2.0, 2, 2, 2);
          const roof = new THREE.Mesh(roofGeometry, bodyMaterial);
          roof.position.y = 1.6;
          roof.castShadow = true;
          carGroup.add(roof);
          // Hood
          const hoodGeometry = new THREE.BoxGeometry(1.5, 0.3, 2.0);
          const hood = new THREE.Mesh(hoodGeometry, bodyMaterial);
          hood.position.set(1.8, 1.0, 0);
          hood.castShadow = true;
          carGroup.add(hood);
          // Wheels
          createDetailedWheels(carGroup);
          // Windows
          createWindows(carGroup);
          // Lights
          createLights(carGroup);
          carRef.current = carGroup;
          scene.add(carGroup);
          setIsLoading(false);
        }
      );
    };

    // Create car material
    const createCarMaterial = (color, materialType) => {
      const colorHex = new THREE.Color(color);
      
      switch (materialType) {
        case 'matte':
          return new THREE.MeshLambertMaterial({ color: colorHex });
        case 'glossy':
          return new THREE.MeshPhongMaterial({ 
            color: colorHex, 
            shininess: 100,
            specular: 0x333333
          });
        case 'pearlescent':
          return new THREE.MeshPhysicalMaterial({
            color: colorHex,
            metalness: 0.1,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
          });
        case 'carbon':
          return new THREE.MeshPhysicalMaterial({
            color: 0x222222,
            metalness: 0.8,
            roughness: 0.2
          });
        case 'metallic':
        default:
          return new THREE.MeshStandardMaterial({ 
            color: colorHex,
            metalness: 0.7,
            roughness: 0.3
          });
      }
    };

    // Create detailed wheels
    const createDetailedWheels = (carGroup) => {
      const wheelPositions = [
        [-1.8, 0.5, 1.2], [1.8, 0.5, 1.2],
        [-1.8, 0.5, -1.2], [1.8, 0.5, -1.2]
      ];

      wheelPositions.forEach(pos => {
        const wheelGroup = new THREE.Group();
        
        // Tire
        const tireGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 16);
        const tireMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
        const tire = new THREE.Mesh(tireGeometry, tireMaterial);
        tire.rotation.z = Math.PI / 2;
        wheelGroup.add(tire);

        // Rim
        const rimGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.35, 8);
        const rimMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x888888, 
          shininess: 100 
        });
        const rim = new THREE.Mesh(rimGeometry, rimMaterial);
        rim.rotation.z = Math.PI / 2;
        wheelGroup.add(rim);

        wheelGroup.position.set(pos[0], pos[1], pos[2]);
        wheelGroup.castShadow = true;
        carGroup.add(wheelGroup);
      });
    };

    // Create windows
    const createWindows = (carGroup) => {
      const windowMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x87ceeb,
        transmission: 0.9,
        opacity: 0.3,
        transparent: true
      });

      // Front windshield
      const frontWindowGeometry = new THREE.PlaneGeometry(2.8, 1.2);
      const frontWindow = new THREE.Mesh(frontWindowGeometry, windowMaterial);
      frontWindow.position.set(0.8, 1.8, 1.01);
      frontWindow.rotation.x = -Math.PI / 6;
      carGroup.add(frontWindow);

      // Side windows
      const sideWindowGeometry = new THREE.PlaneGeometry(1.5, 0.8);
      const leftWindow = new THREE.Mesh(sideWindowGeometry, windowMaterial);
      leftWindow.position.set(-0.5, 1.8, 1.11);
      carGroup.add(leftWindow);

      const rightWindow = new THREE.Mesh(sideWindowGeometry, windowMaterial);
      rightWindow.position.set(-0.5, 1.8, -1.11);
      carGroup.add(rightWindow);
    };

    // Create lights
    const createLights = (carGroup) => {
      // Headlights
      const headlightGeometry = new THREE.SphereGeometry(0.15, 8, 6);
      const headlightMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff, 
        emissive: 0x444444 
      });

      const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
      leftHeadlight.position.set(2.1, 0.9, 0.7);
      carGroup.add(leftHeadlight);

      const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
      rightHeadlight.position.set(2.1, 0.9, -0.7);
      carGroup.add(rightHeadlight);

      // Taillights
      const taillightMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff0000, 
        emissive: 0x220000 
      });

      const leftTaillight = new THREE.Mesh(headlightGeometry, taillightMaterial);
      leftTaillight.position.set(-2.1, 0.9, 0.7);
      carGroup.add(leftTaillight);

      const rightTaillight = new THREE.Mesh(headlightGeometry, taillightMaterial);
      rightTaillight.position.set(-2.1, 0.9, -0.7);
      carGroup.add(rightTaillight);
    };

    // Create environment
    const createEnvironment = (scene) => {
      // Ground with reflective material
      const groundGeometry = new THREE.PlaneGeometry(50, 50);
      const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        metalness: 0.1,
        roughness: 0.8
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

  // ...existing code...
    };

    // Update car color and material
    React.useEffect(() => {
      if (carRef.current && sceneRef.current) {
        loadCarModel(sceneRef.current, carModel, color, material);
      }
    }, [color, material]);

    return (
      <div className="relative w-full h-full" data-name="car-3d-viewer" data-file="components/Car3DViewer.js">
        <div ref={mountRef} className="w-full h-full" />
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="glass-effect rounded-lg p-6">
              <div className="flex items-center gap-3 text-white">
                <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                <span className="text-lg font-medium">Loading 3D Model...</span>
              </div>
            </div>
          </div>
        )}

        {/* Controls overlay */}
        <div className="absolute bottom-4 left-4 glass-effect rounded-lg p-3">
          <div className="text-[var(--text-secondary)] text-sm space-y-1">
            <div className="flex items-center gap-2">
              <div className="icon-mouse text-sm"></div>
              <span>Drag to rotate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="icon-zoom-in text-sm"></div>
              <span>Scroll to zoom</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="icon-move text-sm"></div>
              <span>Right-click to pan</span>
            </div>
          </div>
        </div>

        {/* Model info overlay */}
        <div className="absolute top-4 left-4 glass-effect rounded-lg p-3">
          <div className="text-[var(--text-primary)] text-sm">
            <div className="font-medium mb-1">Current Model</div>
            <div className="text-[var(--text-secondary)] capitalize mb-2">{carModel} - {material} finish</div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: color }}></div>
              <span className="text-xs uppercase">{color}</span>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Car3DViewer component error:', error);
    return null;
  }
}