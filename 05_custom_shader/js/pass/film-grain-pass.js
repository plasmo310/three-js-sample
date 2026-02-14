import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

export class CustomFilmGrainPass extends ShaderPass {
  static VERT_SHADER = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

  static FRAG_SHADER = `
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uStrength;
uniform float uSpeed;

varying vec2 vUv;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453);
}

void main() {

  vec4 col = texture2D(tDiffuse, vUv);

  float noise = random(vUv + uTime * uSpeed * 10.0) - 0.5;
  float flicker = 0.9 + 0.1 * sin(uTime * uSpeed * 8.0);
  col.rgb += noise * uStrength * flicker;

  gl_FragColor = col;
}
`;

  constructor({ strength = 0.25, speed = 0.1, time = 0.0 } = {}) {
    super({
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: time },
        uStrength: { value: strength },
        uSpeed: { value: speed },
      },
      vertexShader: CustomFilmGrainPass.VERT_SHADER,
      fragmentShader: CustomFilmGrainPass.FRAG_SHADER,
    });
  }

  onUpdate(deltaTime) {
    this.material.uniforms.uTime.value += deltaTime;
  }
}
