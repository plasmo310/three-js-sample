import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { Cube } from "./cube.js";

/**
 * Main Application
 */
class MainApp {
  constructor(container) {
    // check container.
    if (!container) {
      console.log("not found MainApp container.");
      return;
    }
    this.container = container;

    // check available WebGL.
    if (!WebGL.isWebGL2Available()) {
      this.container.appendChild(WebGL.getWebGLErrorMessage());
      return;
    }

    // on start.
    this.onStart();
    window.addEventListener("resize", () => this.onWindowResize());
  }

  get width() {
    return this.container.clientWidth;
  }

  get height() {
    return this.container.clientHeight;
  }

  onWindowResize() {
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  onStart() {
    // create clock.
    this.clock = new THREE.Clock();

    // create scene, camera.
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000,
    );
    this.camera.position.z = 5;

    // create renderer and append to DOM.
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setAnimationLoop(() => {
      const deltaTime = this.clock.getDelta();
      this.onUpdate(deltaTime);
      this.renderer.render(this.scene, this.camera);
    });
    this.container.appendChild(this.renderer.domElement);

    // create cube.
    this.cube = new Cube();
    this.scene.add(this.cube.mesh);

    // adjust window size.
    this.onWindowResize();
  }

  onUpdate(deltaTime) {
    // update cube.
    this.cube.onUpdate(deltaTime);
  }
}

window.addEventListener("load", () => {
  const container = document.getElementById("container");
  new MainApp(container);
});
