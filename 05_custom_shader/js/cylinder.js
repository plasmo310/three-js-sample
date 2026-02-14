import * as THREE from "three";
import { CustomToonMaterial } from "./shader/toon_material.js";
import {
  CustomOutlineMaterial,
  embedSoftNormalAttribute,
} from "./shader/outline_material.js";

/**
 * Cylinder
 */
export class Cylinder {
  constructor() {
    // create root.
    this.root = new THREE.Group();
    this.root.name = "Cylinder";

    const geometry = new THREE.CylinderGeometry(1, 1, 2);

    // create outline mesh.
    let outlineGeometry = geometry.clone();
    outlineGeometry = embedSoftNormalAttribute(outlineGeometry);
    const outlineMaterial = new CustomOutlineMaterial({
      color: new THREE.Color(0xffffff),
      width: 0.05,
      useSoftNormal: true,
    });
    const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
    outline.frustumCulled = false;

    // create mesh.
    const material = new CustomToonMaterial({
      color: new THREE.Color(0x66aaff),
    });
    const mesh = new THREE.Mesh(geometry, material);

    // add root.
    this.root.clear();
    this.root.add(outline);
    this.root.add(mesh);
  }

  onUpdate(deltaTime) {
    // rotate.
    this.root.rotation.x += 1 * deltaTime;
    this.root.rotation.y += 1 * deltaTime;
  }
}
