import React, { useRef, useEffect } from "react";
import Button from "./Button";
import Cube from "./threejs/Cube";
import models from "../models.json";
import * as THREE from "three";
import { updateCaptchaResult } from "../reducer/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";

const Topbar = ({ grid, objects, importScene }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loadedObjCount = useRef(null);
  const loadedModelIndex = useRef(null);
  useEffect(() => {
    loadedModelIndex.current = Math.floor(Math.random() * 4);
    //loadedModelIndex.current = 3;
    loadedObjCount.current = _importFile(models[loadedModelIndex.current]);
  }, []);

  function runCaptcha() {
    const count = checkObjCount();
    if (count !== true) {
      console.log("used incorrect number of cubes");
      dispatch(updateCaptchaResult(false));
      resetScene();
      return false;
    }
    console.log("checking cube positions...");
    const obj1 = new THREE.Group();
    for (let i = 0; i < loadedObjCount.current; i++) {
      obj1.add(objects[i]);
    }
    const obj2 = new THREE.Group();
    for (let i = loadedObjCount.current; i < objects.length; i++) {
      obj2.add(objects[i]);
    }

    const obj1PairIndex = GetTopLeftObjectIndex(obj1);
    const obj2PairIndex = GetTopLeftObjectIndex(obj2);
    const objectA = obj1.children[obj1PairIndex];
    const objectB = obj2.children[obj2PairIndex];
    //console.log(obj1PairIndex + "indeksy " + obj2PairIndex);
    const positionDiff = objectA.position.clone().sub(objectB.position);
    //console.log(positionDiff);
    const loadedModel = [];
    for (let i = 0; i < loadedObjCount.current; i++) {
      loadedModel.push(objects[i]);
    }
    //console.log(obj2);
    //console.log(loadedModel);
    for (let i = loadedObjCount.current; i < objects.length; i++) {
      let position = {
        x: objects[i].position.x + positionDiff.x,
        y: objects[i].position.y + positionDiff.y,
        z: objects[i].position.z + positionDiff.z,
      };

      //console.log(position);
      if (checkObjectPosition(position, loadedModel) !== true) {
        console.log("failed test - incorrect cube arragment");
        dispatch(updateCaptchaResult(false));
        resetScene();
        return false;
      }
    }

    dispatch(updateCaptchaResult(true));
    navigate("/login");
    console.log("result - ok");
  }

  function checkObjectPosition(position: any, loadedModel: any) {
    const objectExists = loadedModel.some(
      (obj: any) =>
        obj.position.x === position.x &&
        obj.position.y === position.y &&
        obj.position.z === position.z
    );
    //console.log(objectExists);
    return objectExists;
  }

  function checkObjCount() {
    if (loadedObjCount.current * 2 !== objects.length) {
      return false;
    }
    return true;
  }

  function _importFile(objects: any) {
    const cubes = objects.map(
      (o: any) =>
        new Cube(
          o.intersect,
          o.color,
          o.dimensions,
          o.rotation,
          o.translation,
          o.position
        )
    );
    importScene(cubes);
    const loadedObjCount = objects.length;

    return loadedObjCount;
  }

  function GetTopLeftObjectIndex(group: any) {
    //console.log(group);
    let minX = 1000;
    let minZ = 1000;
    let leftTopObjectIndex = 0;
    for (let i = 0; i < group.children.length; i++) {
      let currentChildPosition = group.children[i].position;
      //console.log(currentChildPosition);
      if (currentChildPosition.x <= minX && currentChildPosition.z <= minZ) {
        minX = currentChildPosition.x;
        minZ = currentChildPosition.z;
        leftTopObjectIndex = i;
        //console.log(leftTopObjectIndex + " " + minX + " " + minZ);
      }
    }
    return leftTopObjectIndex;
  }

  function resetScene() {
    loadedModelIndex.current = Math.floor(Math.random() * 4);
    loadedObjCount.current = _importFile(models[loadedModelIndex.current]);
  }

  return (
    <div className="topbar">
      <div className="section">
        <Button
          active={grid}
          onClick={resetScene}
          icon=""
          text="Change Test Object"
        />
      </div>

      <div className="section">
        <Button active={grid} onClick={runCaptcha} text="Check Result" />
      </div>
    </div>
  );
};

export default Topbar;
