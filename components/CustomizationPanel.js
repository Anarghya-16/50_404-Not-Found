function CustomizationPanel({ selectedCar, onCarChange, carColor, onColorChange, material, onMaterialChange }) {
  try {
    const [activeTab, setActiveTab] = React.useState('color');

    const carModels = [
      { id: 'sedan', name: 'Luxury Sedan', price: '$45,000' },
      { id: 'suv', name: 'Premium SUV', price: '$65,000' },
      { id: 'sports', name: 'Sports Car', price: '$85,000' },
      { id: 'electric', name: 'Electric Vehicle', price: '$55,000' }
    ];

    return (
      <div className="p-6 h-full" data-name="customization-panel" data-file="components/CustomizationPanel.js">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Customize Your Car</h2>
          <p className="text-[var(--text-secondary)]">Personalize every detail to match your style</p>
        </div>

        {/* Car Model Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-[var(--text-primary)]">Choose Model</h3>
          <div className="space-y-2">
            {carModels.map((car) => (
              <div
                key={car.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedCar === car.id
                    ? 'border-[var(--primary-color)] bg-[var(--primary-color)] bg-opacity-10'
                    : 'border-[var(--border)] hover:border-[var(--primary-color)] hover:border-opacity-50'
                }`}
                onClick={() => onCarChange(car.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-[var(--text-primary)]">{car.name}</h4>
                    <p className="text-sm text-[var(--text-secondary)]">{car.price}</p>
                  </div>
                  <div className="icon-check text-[var(--primary-color)]" 
                       style={{ opacity: selectedCar === car.id ? 1 : 0 }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customization Tabs */}
        <div className="mb-4">
          <div className="flex border-b border-[var(--border)]">
            {['color', 'material', 'accessories'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'color' && (
            <ColorSelector color={carColor} onColorChange={onColorChange} />
          )}
          {activeTab === 'material' && (
            <MaterialSelector material={material} onMaterialChange={onMaterialChange} />
          )}
          {activeTab === 'accessories' && (
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--text-primary)]">Available Accessories</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-[var(--text-primary)]">Tinted Windows</span>
                  <span className="text-sm text-[var(--text-secondary)] ml-auto">+$500</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-[var(--text-primary)]">Roof Rails</span>
                  <span className="text-sm text-[var(--text-secondary)] ml-auto">+$300</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-[var(--text-primary)]">LED Lighting Kit</span>
                  <span className="text-sm text-[var(--text-secondary)] ml-auto">+$800</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Price Summary */}
        <div className="mt-6 p-4 bg-[var(--surface-light)] rounded-lg border border-[var(--border)]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[var(--text-secondary)]">Base Price:</span>
            <span className="font-medium text-[var(--text-primary)]">$65,000</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[var(--text-secondary)]">Customizations:</span>
            <span className="font-medium text-[var(--accent-color)]">+$1,300</span>
          </div>
          <hr className="my-2 border-[var(--border)]" />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[var(--text-primary)]">Total:</span>
            <span className="font-bold text-lg text-[var(--primary-color)]">$66,300</span>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CustomizationPanel component error:', error);
    return null;
  }
}