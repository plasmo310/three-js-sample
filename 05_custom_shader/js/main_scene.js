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

    // create lights.
    const aoLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(aoLight);

    const dirLightTarget = new THREE.Object3D();
    dirLightTarget.position.set(0, 0, 0);
    this.scene.add(dirLightTarget);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.target = dirLightTarget;
    dirLight.position.set(10, 10, 5);
    this.scene.add(dirLight);

    // create cube.
    this.cube = new Cube();
    this.scene.add(this.cube.root);
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
