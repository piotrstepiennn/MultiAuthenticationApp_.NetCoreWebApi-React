import React from "react";
import * as THREE from "three";
const OrbitControls = require("../utils/OrbitControls")(THREE);
import Cube from "./threejs/Cube";
import {
  PerspectiveCamera,
  Light,
  Plane,
  Renderer,
  RollOverCube,
} from "./threejs";
import { getMeasurements } from "../utils";

const base = 25;

class Scene extends React.Component<any> {
  rollOverCube: any;
  grid: any;
  scene: any;
  renderer: any;
  camera: any;
  controls: any;
  mount: any;
  plane: any;
  raycaster: any;
  mouse: any;
  frameId: any;
  state = {
    drag: false,
    rotation: 0,
    coreObjects: [] as [],
    clicked: false,
  };

  constructor(props: any) {
    super(props);

    this._start = this._start.bind(this);
    this._stop = this._stop.bind(this);
    this._animate = this._animate.bind(this);
  }

  componentDidMount() {
    this._initScene();
    this._initUtils();
    this._initEnviroment();

    this._setEventListeners();
    this._start();
  }

  componentDidUpdate(prevProps: any) {
    const { dimensions, objects }: any = this.props;
    this.rollOverCube.visible = true;

    this.grid.visible = true;
    if (
      prevProps.dimensions.x !== dimensions.x ||
      prevProps.dimensions.z !== dimensions.z
    ) {
      this.rollOverCube.setShape(dimensions);
    }

    if (objects.length !== prevProps.objects.length) {
      this._setObjectsFromState();
    }
  }

  _initScene() {
    const scene = new THREE.Scene();
    this.scene = scene;

    const renderer = new Renderer({ antialias: true });
    renderer.init(window.innerWidth, window.innerHeight);
    this.renderer = renderer;

    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.init();
    this.camera = camera;

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls = controls;

    this.mount.appendChild(this.renderer.domElement);
  }

  _initEnviroment() {
    const light = new Light();
    light.init();
    this.scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x606060);
    this.scene.add(ambientLight);

    // position
    const pointLight = new THREE.PointLight(0xfff0f0, 0.6, 100, 0);
    pointLight.position.set(-1000, 1500, 500);
    this.scene.add(pointLight);

    const plane = new Plane(3000);
    this.plane = plane;
    this.scene.add(plane);

    const grid = new THREE.GridHelper(
      1500,
      60,
      new THREE.Color(0x33373d),
      new THREE.Color(0x64686e)
    );
    this.grid = grid;
    this.scene.add(grid);

    this.setState({
      coreObjects: [
        light,
        ambientLight,
        pointLight,
        plane,
        grid,
        this.rollOverCube,
      ],
    });
  }

  _initUtils() {
    const { cubeColor, dimensions } = this.props;
    const rollOverCube = new RollOverCube(cubeColor, dimensions);
    this.scene.add(rollOverCube);
    this.rollOverCube = rollOverCube;
    const raycaster = new THREE.Raycaster();
    this.raycaster = raycaster;
    const mouse = new THREE.Vector2();
    this.mouse = mouse;
  }

  _setObjectsFromState() {
    const { objects } = this.props;
    const { coreObjects } = this.state;
    this.scene.children = [...objects, ...coreObjects];
  }

  _setEventListeners() {
    document.addEventListener(
      "mousemove",
      (event) => this._onMouseMove(event, this),
      false
    );
    document.addEventListener(
      "mousedown",
      (event) => this._onMouseDown(event),
      false
    );
    document.addEventListener(
      "mouseup",
      (event) => this._onMouseUp(event, this),
      false
    );
    window.addEventListener(
      "resize",
      (event) => this._onWindowResize(event, this),
      false
    );
  }

  _onWindowResize(event: any, scene: any) {
    scene.camera.aspect = window.innerWidth / window.innerHeight;
    scene.camera.updateProjectionMatrix();
    scene.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  _onMouseMove(event: any, scene: any) {
    const { clicked } = this.state;
    const { dimensions, objects } = this.props;
    event.preventDefault();
    const drag = true;
    this.setState({ drag });
    const { width, height } = getMeasurements(dimensions);
    const evenWidth = dimensions.x % 2 === 0;
    const evenDepth = dimensions.z % 2 === 0;
    scene.mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    scene.raycaster.setFromCamera(scene.mouse, scene.camera);
    const intersects = scene.raycaster.intersectObjects(
      [...objects, this.plane],
      true
    );
    if (intersects.length > 0) {
      const intersect = intersects[0];
      if (!clicked) {
        scene.rollOverCube.position
          .copy(intersect.point)
          .add(intersect.face.normal);
        scene.rollOverCube.position
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
    }
  }

  _onMouseDown(event: any) {
    this.setState({
      drag: false,
    });
  }

  _onMouseUp(event: any, scene: any) {
    const { objects } = this.props;
    const { drag, clicked } = this.state;
    if (event.target.localName !== "canvas") return;
    event.preventDefault();
    if (!drag) {
      scene.mouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      scene.raycaster.setFromCamera(scene.mouse, scene.camera);
      const intersects = scene.raycaster.intersectObjects([
        ...objects,
        this.plane,
      ]);
      if (intersects.length > 0) {
        const intersect = intersects[0];

        // delete cube
        if (clicked) {
          this._deleteCube(intersect);
        }
        // create cube
        else {
          this._createCube(intersect, scene.rollOverCube);
        }
      }
    }
  }

  _createCube(intersect: any, rollOverCube: any) {
    const { cubeColor, dimensions, objects, addObject } = this.props;
    let canCreate = true;
    const { width, depth } = getMeasurements(dimensions);
    const cubes = objects;
    const meshBoundingBox = new THREE.Box3().setFromObject(this.rollOverCube);
    for (let i = 0; i < cubes.length; i++) {
      const cubeBoundingBox = new THREE.Box3().setFromObject(cubes[i]);
      const collision = meshBoundingBox.intersectsBox(cubeBoundingBox);
      if (collision) {
        const dx = Math.abs(cubeBoundingBox.max.x - meshBoundingBox.max.x);
        const dz = Math.abs(cubeBoundingBox.max.z - meshBoundingBox.max.z);
        const yIntsersect = cubeBoundingBox.max.y - 9 > meshBoundingBox.min.y;
        if (yIntsersect && dx !== width && dz !== depth) {
          canCreate = false;
          break;
        }
      }
    }
    if (canCreate) {
      const { translation, rotation } = rollOverCube;
      const cube = new Cube(
        intersect,
        cubeColor,
        dimensions,
        rotation.y,
        translation
      );
      addObject(cube);
    }
  }

  _deleteCube(intersect: any) {
    const { removeObject } = this.props;
    if (intersect.object !== this.plane) {
      intersect.object.geometry.dispose();
      removeObject(intersect.object.customId);
    }
  }

  _start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this._animate);
    }
  }

  _stop() {
    cancelAnimationFrame(this.frameId);
  }

  _animate() {
    this.controls.update();

    this._renderScene();
    this.frameId = window.requestAnimationFrame(this._animate);
  }

  _renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        id="canvas"
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default Scene;
