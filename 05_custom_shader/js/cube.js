import * as THREE from "three";
import { CustomToonMaterial } from "./shader/toon_material.js";

/**
 * Cube
 */
export class Cube {
  constructor() {
    // create root.
    this.root = new THREE.Group();
    this.root.name = "Cube";

    // create mesh.
    const geometry = new THREE.CylinderGeometry(1, 1, 2);
    const material = new CustomToonMaterial({
      color: new THREE.Color(0x66aaff),
    });
    const mesh = new THREE.Mesh(geometry, material);

    // add root.
    this.root.clear();
    this.root.add(mesh);
  }

  onUpdate(deltaTime) {
    // rotate.
    this.root.rotation.x += 1 * deltaTime;
    this.root.rotation.y += 1 * deltaTime;
  }
}
