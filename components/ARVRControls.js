function ARVRControls({ onARToggle, onVRToggle, isARActive, isVRActive }) {
  try {
    return (
      <div className="flex flex-col gap-3" data-name="ar-vr-controls" data-file="components/ARVRControls.js">
        {/* AR Control */}
        <button
          onClick={onARToggle}
          className={`glass-effect rounded-lg p-3 transition-all ${
            isARActive ? 'bg-green-500 bg-opacity-20' : ''
          }`}
          title="Toggle Augmented Reality"
        >
          <div className="flex items-center gap-2 text-white">
            <div className="icon-smartphone text-xl"></div>
            <span className="text-sm font-medium">AR View</span>
          </div>
        </button>

        {/* VR Control */}
        <button
          onClick={onVRToggle}
          className={`glass-effect rounded-lg p-3 transition-all ${
            isVRActive ? 'bg-blue-500 bg-opacity-20' : ''
          }`}
          title="Toggle Virtual Reality"
        >
          <div className="flex items-center gap-2 text-white">
            <div className="icon-headphones text-xl"></div>
            <span className="text-sm font-medium">VR Mode</span>
          </div>
        </button>

        {/* 360° View */}
        <button
          className="glass-effect rounded-lg p-3"
          title="360° View"
        >
          <div className="flex items-center gap-2 text-white">
            <div className="icon-rotate-3d text-xl"></div>
            <span className="text-sm font-medium">360°</span>
          </div>
        </button>

        {/* Screenshot */}
        <button
          className="glass-effect rounded-lg p-3"
          title="Take Screenshot"
        >
          <div className="flex items-center gap-2 text-white">
            <div className="icon-camera text-xl"></div>
            <span className="text-sm font-medium">Photo</span>
          </div>
        </button>
      </div>
    );
  } catch (error) {
    console.error('ARVRControls component error:', error);
    return null;
  }
}