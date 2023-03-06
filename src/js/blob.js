import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import now from "performance-now";
import { createNoise4D } from "simplex-noise";

export function allAnimations() {
  const container = document.querySelector("#scene-container");

  /* -------------------------------------- 
        SCENE & CAMERA & RENDERER
  --------------------------------------- */

  const scene = new THREE.Scene();
  // scene.background = new THREE.Color("#ff0066");

  const fov = 20; // AKA Field of View
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1; // the near clipping plane
  const far = 100; // the far clipping plane
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 10);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  // For HiDPI displays
  renderer.setPixelRatio(window.devicePixelRatio);
  container.append(renderer.domElement);
  renderer.render(scene, camera);

  /* ----------------------------- 
        AXES & GRID & ORBIT
  ----------------------------- */

  const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper);

  const gridHelper = new THREE.GridHelper(30);
  // scene.add(gridHelper);

  const orbit = new OrbitControls(camera, renderer.domElement);

  /* ----------------------------- 
        GEOMETRIES
  ----------------------------- */

  // Bubble
  const geometry = new THREE.CircleGeometry(2, 128, 6, 6.3);
  const material = new THREE.MeshBasicMaterial();
  const bubble = new THREE.Mesh(geometry, material);
  bubble.scale.x = 1.25;
  scene.add(bubble);

  /* ----------------------------- 
        BUBBLE ANIMATION
  ----------------------------- */

  const noise4D = createNoise4D();
  const animateBubble = () => {
    const speedSlider = 20; //40?
    const spikesSlider = 1.1; // 1?
    const processingSlider = 0.7; //0.6?
    const time = now() * 0.00001 * speedSlider * Math.pow(processingSlider, 3),
      spikes = spikesSlider * processingSlider;
    const position = bubble.geometry.attributes.position;
    const vector = new THREE.Vector3();
    for (let i = 0, l = position.count; i < l; i++) {
      const b = vector.fromBufferAttribute(position, i); // bubble vertices
      b.normalize().multiplyScalar(1.4 + 0.3 * noise4D(b.x * spikes, b.y * spikes, b.z * spikes + time, 3));
      position.setXYZ(i, b.x, b.y, b.z);
    }
    bubble.geometry.computeVertexNormals();
    bubble.geometry.normalsNeedUpdate = true;
    bubble.geometry.attributes.position.needsUpdate = true;
  };

  /* ----------------------------- 
        ANIMATE
  ----------------------------- */

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    animateBubble();
    // moveMouseCircle();
    // console.log(intersects);
  }

  animate();

  /* ----------------------------- 
        WINDOW RESIZING
  ----------------------------- */

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", onWindowResize, false);

  /* -------------------------------------- 
        NON-THREE_JS CURSOR ANIMATIONS
  -------------------------------------- */

  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.pageX - 25}px, ${e.pageY - 25}px)`;
  });

  /* -------------------------------------- 
        WEATHER-SELECTOR-PAGE ANIMATION
  -------------------------------------- */

  const weather = document.querySelector(".weather");
  const scores = document.querySelector("#score-buttons");
  const h1 = document.querySelector("h1");
  const citySelector = document.querySelector("#city-selector");

  const fadeContent = () => {
    h1.classList.toggle("faded");
    scores.classList.toggle("faded");
    container.classList.toggle("faded");
    citySelector.classList.toggle("faded");
  };

  const close = document.querySelector(".close");

  [weather, close].forEach((button) =>
    button.addEventListener("click", () => {
      fadeContent();
    })
  );
}
