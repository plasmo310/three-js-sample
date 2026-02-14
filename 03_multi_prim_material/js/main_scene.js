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
    const aoLight = new THREE.AmbientLight({
      color: 0xffffff,
      intensity: 0.5,
    });
    this.scene.add(aoLight);
    const dirLight = new THREE.DirectionalLight({
      color: 0xffffff,
      intensity: 0.5,
      position: new THREE.Vector3(0, 10, 0),
      target: new THREE.Vector3(0, 0, 0),
    });
    this.scene.add(dirLight);

    // TODO: material variation.
    this.materials = [
      new THREE.MeshBasicMaterial({
        color: "white",
        wireframe: true,
      }),
      new THREE.MeshBasicMaterial({
        color: "white",
      }),
      new THREE.MeshLambertMaterial({
        color: "white",
      }),
      new THREE.MeshPhongMaterial({
        color: "white",
        metalness: 10.0,
        specular: new THREE.Color("white"),
      }),
      new THREE.MeshNormalMaterial({
        color: "white",
      }),
    ];

    // TODO: geometry variation.
    this.geometries = [];

    // created actors.
    this.actors = [];

    // offset values.
    const OFFSET_POS_UNIT_Y = 1.25;
    let posOffsetY = (OFFSET_POS_UNIT_Y * (this.materials.length - 1)) / 2;

    for (const material of this.materials) {
      const actor = new Cube(material);
      this.scene.add(actor.mesh);
      this.actors.push(actor);

      actor.mesh.position.y = posOffsetY;
      posOffsetY -= OFFSET_POS_UNIT_Y;
    }
  }

  onUpdate(deltaTime) {
    // update objects.
    for (const actor of this.actors) {
      actor.onUpdate(deltaTime);
    }
  }

  onWindowResize(width, height) {
    // update camera aspect.
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
