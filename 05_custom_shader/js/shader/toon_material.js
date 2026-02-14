import * as THREE from "three";

/**
 * Custom Toon Material
 */
export class CustomToonMaterial extends THREE.ShaderMaterial {
  static VERT_SHADER = `
varying vec2 vUv;
varying vec3 vWorldNormal;

void main() {
  vUv = uv;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

  static FRAG_SHADER = `
uniform vec3 uColor;
uniform vec3 uLightDir;
uniform sampler2D uMainTex;
varying vec2 vUv;
varying vec3 vWorldNormal;

void main() {
  float nl = max(0.0, dot(normalize(vWorldNormal), normalize(uLightDir)));

  if (nl <= 0.01) nl = 0.3;
  else if (nl <= 0.3) nl = 0.5;
  else nl = 1.0;

  vec4 col = vec4(uColor, 1.0);
  col *= texture2D(uMainTex, vUv);
  col.rgb *= nl;

  gl_FragColor = col;
}
`;

  static WHITE_TEX = (() => {
    const t = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
    t.needsUpdate = true;
    return t;
  })();

  constructor({
    color = new THREE.Color(0x66aaff),
    map = null,
    lightDir = new THREE.Vector3(0.5, 1.0, 0.2).normalize(),
    ambientColor = new THREE.Color(0xffffff),
    ambientStrength = 0.2,
  } = {}) {
    super({
      vertexShader: CustomToonMaterial.VERT_SHADER,
      fragmentShader: CustomToonMaterial.FRAG_SHADER,
      uniforms: {
        uColor: {
          value: color,
        },
        uMainTex: {
          value: map ?? CustomToonMaterial.WHITE_TEX,
        },
        uLightDir: {
          value: lightDir,
        },
        uAmbientColor: {
          value: ambientColor,
        },
        uAmbientStrength: {
          value: ambientStrength,
        },
      },
    });
  }
}
