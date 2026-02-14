import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

/**
 * Elekibear
 */
export class Elekibear {
  constructor() {
    // create root.
    this.root = new THREE.Group();
    this.root.name = "Elekibear";

    this.loadModelAsync();
  }

  async loadModelAsync() {
    // エラー対処:
    // FBX内のテクスチャパスが無いとエラーになるので強制的に差し替え.
    const TEXTURE_PATH = "public/textures/T_Elekibear.png";
    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
      if (/\.(png|jpe?g|tga|bmp|gif)$/i.test(url)) return TEXTURE_PATH;
      return url;
    });

    // load mesh.
    const loader = new FBXLoader(manager);
    const mesh = await loader.loadAsync("public/models/SM_Elekibear.fbx");

    // load texture.
    const baseColorTex = await new THREE.TextureLoader().loadAsync(
      "/public/textures/T_Elekibear.png",
    );
    baseColorTex.colorSpace = THREE.SRGBColorSpace;

    // create material.
    const material = new THREE.MeshPhongMaterial({
      map: baseColorTex,
    });

    // replace materials.
    mesh.traverse((child) => {
      if (child.isMesh) {
        console.log(child.material);
        child.material = material;
      }
    });

    // add root.
    this.root.clear();
    this.root.add(mesh);
  }

  onUpdate(deltaTime) {
    // rotate.
    this.root.rotation.y += 1 * deltaTime;
  }
}
