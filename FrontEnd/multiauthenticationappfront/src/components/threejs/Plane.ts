import * as THREE from "three";
export class Plane extends THREE.Mesh {
  constructor(size: any) {
    const geometry = new THREE.PlaneGeometry(size, size);
    geometry.rotateX(-Math.PI / 2);
    const planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.2;

    super(geometry, planeMaterial);
    this.receiveShadow = true;
  }
}
