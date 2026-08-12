# CarZoo — 3D Car Design & Customization Platform

Problem Statement 1: a browser-based platform for visualizing and customizing cars in real-time 3D, with AR/VR support.

## Features

- **Real-time 3D visualization** of multiple car models (Luxury Sedan, Premium SUV, Sports Car, Electric Vehicle) using Three.js
- **Color customization** with a live color picker/swatch selector
- **Material selection** — metallic, matte, glossy, pearlescent, carbon — with dynamic pricing
- **Dynamic pricing** that updates based on chosen material and accessories
- **AR/VR controls** for immersive viewing
- **Responsive UI** built with React and Tailwind CSS

## Tech Stack

- [React 18](https://react.dev/) (via CDN, no build step)
- [Three.js](https://threejs.org/) — 3D rendering, `GLTFLoader`, `OrbitControls`
- [Tailwind CSS](https://tailwindcss.com/) (via CDN)
- [Babel Standalone](https://babeljs.io/docs/babel-standalone) for in-browser JSX transpilation
- Vanilla JavaScript modules for utilities and components

## Project Structure

```
50_404-Not-Found/
├── index.html                  # Entry point, loads all scripts/styles
├── app.js                      # Root App component
├── components/
│   ├── Header.js
│   ├── Car3DViewer.js          # Three.js scene, camera, model loading
│   ├── CustomizationPanel.js
│   ├── ColorSelector.js
│   ├── MaterialSelector.js
│   └── ARVRControls.js
├── utils/
│   ├── carModels.js            # Car model configs, pricing logic
│   └── renderEngine.js         # Rendering helpers
└── assets/
    └── models/                 # .glb 3D car models
```

## Getting Started

This project has no build step — it runs directly in the browser using CDN-hosted React, Babel, and Three.js.

Because the 3D models are loaded via `fetch`/`GLTFLoader`, you'll need to serve the files over HTTP (opening `index.html` directly with `file://` will run into CORS issues).

1. Clone the repository
   ```bash
   git clone https://github.com/Anarghya-16/50_404-Not-Found.git
   cd 50_404-Not-Found
   ```
2. Serve the folder locally, for example:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser

## Usage

1. Choose a car model (Sedan, SUV, Sports, or Electric) from the customization panel
2. Pick a color using the color selector
3. Choose a material finish to see the price update
4. Toggle AR/VR mode to view the car in an immersive mode

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or file an issue.

