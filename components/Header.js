function Header() {
  try {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect" data-name="header" data-file="components/Header.js">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="icon-car text-xl text-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CarVision 3D</h1>
                <p className="text-sm text-gray-200">Real-time Customization</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button className="text-white hover:text-gray-200 transition-colors">Models</button>
              <button className="text-white hover:text-gray-200 transition-colors">Gallery</button>
              <button className="text-white hover:text-gray-200 transition-colors">Share</button>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-[var(--surface-light)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--border)] transition-all duration-200 flex items-center gap-2">
                <div className="icon-save text-lg"></div>
                Save Config
              </button>
              <button className="btn-primary">
                <div className="icon-share-2 text-lg"></div>
                Share
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}