import { getMeasurementsFromDimensions } from "../../utils";
import * as THREE from "three";
export class RollOverCube extends THREE.Mesh {
  dimensions: number;
  translation: any;
  constructor(color: any, dimensions: any) {
    const { width, height, depth } = getMeasurementsFromDimensions(dimensions);
    const rollOverGeo = new THREE.BoxGeometry(width, height, depth);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x08173e,
      opacity: 0.5,
      transparent: true,
    });
    super(rollOverGeo, mat);
    this.dimensions = dimensions;
    this.translation = 0;
  }

  setShape(dimensions: any) {
    const { width, height, depth } = getMeasurementsFromDimensions(dimensions);
    this.geometry = new THREE.BoxGeometry(width, height, depth);
    this.dimensions = dimensions;
    this.translation = 0;
  }
}
