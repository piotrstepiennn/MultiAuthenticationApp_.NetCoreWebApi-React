import * as THREE from "three";
export class Renderer extends THREE.WebGLRenderer {
  gammaInput: any;
  gammaOutput: any;
  shadowMapSoft: any;

  init(width: any, height: any) {
    this.setClearColor(0xffffff);
    this.setPixelRatio(1);
    this.setSize(width, height);

    this.gammaInput = true;
    this.gammaOutput = true;
    this.shadowMap.enabled = true;
    this.shadowMapSoft = true;
    this.shadowMap.type = THREE.PCFShadowMap;
  }
}
