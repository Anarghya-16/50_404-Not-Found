function MaterialSelector({ material, onMaterialChange }) {
  try {
    const materials = [
      {
        id: 'metallic',
        name: 'Metallic',
        description: 'Shiny metallic finish with light reflection',
        preview: 'linear-gradient(45deg, #silver, #lightgray)',
        price: '+$0'
      },
      {
        id: 'matte',
        name: 'Matte',
        description: 'Non-reflective smooth finish',
        preview: '#4a5568',
        price: '+$500'
      },
      {
        id: 'glossy',
        name: 'Glossy',
        description: 'High-gloss mirror-like finish',
        preview: 'linear-gradient(45deg, #1a202c, #2d3748)',
        price: '+$800'
      },
      {
        id: 'pearlescent',
        name: 'Pearlescent',
        description: 'Color-shifting pearl finish',
        preview: 'linear-gradient(45deg, #f7fafc, #edf2f7, #e2e8f0)',
        price: '+$1200'
      },
      {
        id: 'carbon',
        name: 'Carbon Fiber',
        description: 'Premium carbon fiber texture',
        preview: 'repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 2px, #333 2px, #333 4px)',
        price: '+$2000'
      }
    ];

    return (
      <div className="space-y-4" data-name="material-selector" data-file="components/MaterialSelector.js">
        <h4 className="font-medium mb-4 text-[var(--text-primary)]">Choose Material & Finish</h4>
        
        <div className="space-y-3">
          {materials.map((mat) => (
            <div
              key={mat.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                material === mat.id
                  ? 'border-[var(--primary-color)] bg-[var(--primary-color)] bg-opacity-10'
                  : 'border-[var(--border)] hover:border-[var(--primary-color)] hover:border-opacity-50'
              }`}
              onClick={() => onMaterialChange(mat.id)}
            >
              <div className="flex items-center gap-4">
                {/* Material Preview */}
                <div
                  className="w-12 h-12 rounded-lg border border-gray-200"
                  style={{ background: mat.preview }}
                ></div>
                
                {/* Material Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium text-[var(--text-primary)]">{mat.name}</h5>
                    <span className="text-sm text-[var(--primary-color)] font-medium">{mat.price}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{mat.description}</p>
                </div>
                
                {/* Selection Indicator */}
                <div className="icon-check text-[var(--primary-color)]" 
                     style={{ opacity: material === mat.id ? 1 : 0 }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Material Properties */}
        <div className="mt-6 p-4 bg-[var(--surface-light)] rounded-lg border border-[var(--border)]">
          <h5 className="font-medium mb-3 text-[var(--text-primary)]">Material Properties</h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Durability:</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[var(--primary-color)]"></div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Maintenance:</span>
              <div className="flex gap-1">
                {[1,2,3].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[var(--accent-color)]"></div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Scratch Resistance:</span>
              <div className="flex gap-1">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-orange-500"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('MaterialSelector component error:', error);
    return null;
  }
}
