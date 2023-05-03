import * as THREE from "three";
export class Light extends THREE.SpotLight {
  shadow: any;
  constructor() {
    super(0xffffff);
  }
  init() {
    this.position.set(-1000, 1500, -500);
    this.intensity = 0.9;
    this.castShadow = true;
    // this.shadow = new THREE.LightShadow(
    //   new THREE.OrthographicCamera(
    //     window.innerWidth / -2,
    //     window.innerWidth / 2,
    //     window.innerHeight / 2,
    //     window.innerHeight / -2,
    //     1,
    //     10000
    //   )
    // );
    this.shadow.bias = -0.0000022;
    this.shadow.mapSize.width = 4096;
    this.shadow.mapSize.height = 4096;
    this.penumbra = 0.5;
    this.decay = 2;
  }
}
