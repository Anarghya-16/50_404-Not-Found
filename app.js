class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Something went wrong</h1>
            <p className="text-[var(--text-secondary)] mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [selectedCar, setSelectedCar] = React.useState('sedan');
    const [carColor, setCarColor] = React.useState('#ff0000');
    const [material, setMaterial] = React.useState('metallic');
    const [showAR, setShowAR] = React.useState(false);
    const [showVR, setShowVR] = React.useState(false);

    return (
      <div className="min-h-screen" data-name="app" data-file="app.js">
        <Header />
        
        <div className="flex h-screen pt-16">
          {/* 3D Viewer Section */}
          <div className="flex-1 relative">
            <Car3DViewer 
              carModel={selectedCar}
              color={carColor}
              material={material}
              showAR={showAR}
              showVR={showVR}
            />
            
            {/* AR/VR Controls Overlay */}
            <div className="absolute top-4 right-4">
              <ARVRControls 
                onARToggle={() => setShowAR(!showAR)}
                onVRToggle={() => setShowVR(!showVR)}
                isARActive={showAR}
                isVRActive={showVR}
              />
            </div>
          </div>
          
          {/* Customization Panel */}
          <div className="w-80 bg-[var(--surface)] border-l border-[var(--border)] overflow-y-auto">
            <CustomizationPanel 
              selectedCar={selectedCar}
              onCarChange={setSelectedCar}
              carColor={carColor}
              onColorChange={setCarColor}
              material={material}
              onMaterialChange={setMaterial}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);