import * as THREE from "three";
import { Cube } from "./cube.js";

/**
 * Main Scene
 */
export class MainScene {
  constructor(width, height) {
    // create scene, camera.
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // create cube.
    this.cube = new Cube();
    this.scene.add(this.cube.mesh);
  }

  onUpdate(deltaTime) {
    // update cube.
    this.cube.onUpdate(deltaTime);
  }

  onWindowResize(width, height) {
    // update camera aspect.
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
