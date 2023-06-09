import { mergeMeshes, getMeasurements } from "../../utils";
import * as THREE from "three";
const base = 25;

export default class Cube extends THREE.Mesh {
  height: any;
  width: any;
  depth: any;
  defaultColor: any;
  _intersect: any;
  _color: any;
  _dimensions: any;
  _rotation: any;
  _translation: any;
  constructor(
    intersect: any,
    color: any,
    dimensions: any,
    rotation: any,
    translation: any,
    _position?: any
  ) {
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.5,
      roughness: 0.4,
    });
    const { height, width, depth } = getMeasurements(dimensions);
    const props = createMesh(cubeMaterial, width, height, depth, dimensions);
    super(...props);

    const evenWidth = dimensions.x % 2 === 0;
    const evenDepth = dimensions.z % 2 === 0;

    this.height = height;
    this.width = width;
    this.depth = depth;

    if (_position != undefined) {
      this.position.copy(_position);
      this.position.x += -500;
      ///console.log(_position);
    } else {
      this.position.copy(intersect.point).add(intersect.face.normal);
      this.position
        .divide(new THREE.Vector3(base, height, base))
        .floor()
        .multiply(new THREE.Vector3(base, height, base))
        .add(
          new THREE.Vector3(
            evenWidth ? base : base / 2,
            height / 2,
            evenDepth ? base : base / 2
          )
        );
    }

    this.rotation.y = rotation;
    this.geometry.translate(translation, 0, translation);
    this.castShadow = true;
    this.receiveShadow = true;
    this.defaultColor = cubeMaterial.color;

    this._intersect = intersect;
    this._color = color;
    this._dimensions = dimensions;
    this._rotation = rotation;
    this._translation = translation;
  }
}

function createMesh(
  material: any,
  width: any,
  height: any,
  depth: any,
  dimensions: any
) {
  let meshes = [];
  const cubeGeo = new THREE.BoxGeometry(width - 0.1, height - 0.1, depth - 0.1);

  const mesh = new THREE.Mesh(cubeGeo, material);
  meshes.push(mesh);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const cubeGeometry = mergeMeshes(meshes);
  return [cubeGeometry, material];
}
