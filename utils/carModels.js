// Car Models Configuration
const CarModels = {
  sedan: {
    id: 'sedan',
    name: 'Luxury Sedan',
    basePrice: 45000,
    modelPath: 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
    dimensions: { width: 4.5, height: 1.4, length: 4.8 },
    features: ['Premium Interior', 'Advanced Safety', 'Fuel Efficient'],
    description: 'Elegant and sophisticated sedan with premium comfort features'
  },
  
  suv: {
    id: 'suv',
    name: 'Premium SUV',
    basePrice: 65000,
    modelPath: 'assets/models/suv.glb',
    dimensions: { width: 0.01, height: 0.02, length: 0.06 }, // Reduced by 4x
    features: ['All-Wheel Drive', '7 Seats', 'Off-Road Capability'],
    description: 'Spacious SUV perfect for families and adventures'
  },
  
  sports: {
    id: 'sports',
    name: 'Sports Car',
    basePrice: 85000,
    modelPath: 'assets/models/sports.glb',
    dimensions: { width: 40, height: 15, length: 35 }, // Further increased for bigger appearance
    features: ['Turbo Engine', 'Racing Suspension', 'Aerodynamic Design'],
    description: 'High-performance sports car for the ultimate driving experience'
  },
  
  electric: {
    id: 'electric',
    name: 'Electric Vehicle',
    basePrice: 55000,
    modelPath: 'assets/models/electric.glb',
    dimensions: { width: 1.9, height: 1.5, length: 4.6 },
    features: ['Zero Emissions', 'Fast Charging', 'Autopilot Ready'],
    description: 'Eco-friendly electric vehicle with cutting-edge technology'
  }
};

// Get model by ID
function getCarModel(modelId) {
  return CarModels[modelId] || CarModels.sedan;
}

// Get all available models
function getAllCarModels() {
  return Object.values(CarModels);
}

// Calculate total price with customizations
function calculatePrice(modelId, customizations = {}) {
  const baseModel = getCarModel(modelId);
  let totalPrice = baseModel.basePrice;
  
  // Add material costs
  const materialCosts = {
    metallic: 0,
    matte: 500,
    glossy: 800,
    pearlescent: 1200,
    carbon: 2000
  };
  
  if (customizations.material) {
    totalPrice += materialCosts[customizations.material] || 0;
  }
  
  // Add accessory costs
  if (customizations.accessories) {
    customizations.accessories.forEach(accessory => {
      const accessoryCosts = {
        'tinted-windows': 500,
        'roof-rails': 300,
        'led-lighting': 800,
        'sport-package': 1500,
        'premium-audio': 1200
      };
      totalPrice += accessoryCosts[accessory] || 0;
    });
  }
  
  return totalPrice;
}