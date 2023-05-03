export const ADD_CUBE = "ADD_CUBE";

export function addCube(cube: any) {
  return {
    type: ADD_CUBE,
    payload: {
      cube,
    },
  };
}

export const REMOVE_CUBE = "REMOVE_CUBE";

export function removeCube(id: any) {
  return {
    type: REMOVE_CUBE,
    payload: {
      id,
    },
  };
}

export const SET_SCENE = "SET_SCENE";

export function setScene(cubes: any) {
  return {
    type: SET_SCENE,
    payload: {
      cubes,
    },
  };
}
