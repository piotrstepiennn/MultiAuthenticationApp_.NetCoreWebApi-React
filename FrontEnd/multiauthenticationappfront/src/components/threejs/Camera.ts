import * as THREE from "three";
export class PerspectiveCamera extends THREE.PerspectiveCamera {
  init() {
    this.position.set(-600, 500, 500);
    this.lookAt(new THREE.Vector3());
  }
}
