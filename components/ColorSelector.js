function ColorSelector({ color, onColorChange }) {
  try {
    const presetColors = [
      { name: 'Cherry Red', hex: '#dc2626' },
      { name: 'Ocean Blue', hex: '#2563eb' },
      { name: 'Midnight Black', hex: '#1f2937' },
      { name: 'Pearl White', hex: '#f9fafb' },
      { name: 'Silver Metallic', hex: '#9ca3af' },
      { name: 'Forest Green', hex: '#059669' },
      { name: 'Sunset Orange', hex: '#ea580c' },
      { name: 'Royal Purple', hex: '#7c3aed' },
      { name: 'Gold Metallic', hex: '#d97706' },
      { name: 'Charcoal Grey', hex: '#4b5563' }
    ];

    return (
      <div className="space-y-6" data-name="color-selector" data-file="components/ColorSelector.js">
        {/* Current Color Display */}
        <div className="text-center">
          <div 
            className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-white shadow-lg"
            style={{ backgroundColor: color }}
          ></div>
          <p className="font-medium text-[var(--text-primary)]">Current Color</p>
          <p className="text-sm text-[var(--text-secondary)] uppercase">{color}</p>
        </div>

        {/* Preset Colors */}
        <div>
          <h4 className="font-medium mb-3 text-[var(--text-primary)]">Preset Colors</h4>
          <div className="grid grid-cols-5 gap-3">
            {presetColors.map((presetColor) => (
              <div
                key={presetColor.hex}
                className={`color-swatch ${color === presetColor.hex ? 'ring-4 ring-[var(--primary-color)]' : ''}`}
                style={{ backgroundColor: presetColor.hex }}
                onClick={() => onColorChange(presetColor.hex)}
                title={presetColor.name}
              ></div>
            ))}
          </div>
        </div>

        {/* Custom Color Picker */}
        <div>
          <h4 className="font-medium mb-3 text-[var(--text-primary)]">Custom Color</h4>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-12 h-12 rounded-lg border border-[var(--border)] cursor-pointer"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)]"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Color Categories */}
        <div>
          <h4 className="font-medium mb-3 text-[var(--text-primary)]">Color Categories</h4>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--surface-light)] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500"></div>
                <span className="text-[var(--text-primary)]">Warm Colors</span>
              </div>
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--surface-light)] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <span className="text-[var(--text-primary)]">Cool Colors</span>
              </div>
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--surface-light)] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-gray-400 to-gray-600"></div>
                <span className="text-[var(--text-primary)]">Neutral Colors</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ColorSelector component error:', error);
    return null;
  }
}