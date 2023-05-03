const base = 25;
import * as THREE from "three";
export function getMeasurementsFromDimensions({ x, y, z }: any) {
  return {
    width: base * x,
    height: base * y || (base * 2) / 1.5,
    depth: base * z,
  };
}

export function mergeMeshes(meshes: any) {
  let combined = new (<any>THREE).Geometry();
  for (let i = 0; i < meshes.length; i++) {
    meshes[i].updateMatrix();
    combined.merge(meshes[i].geometry, meshes[i].matrix);
  }
  return combined;
}
