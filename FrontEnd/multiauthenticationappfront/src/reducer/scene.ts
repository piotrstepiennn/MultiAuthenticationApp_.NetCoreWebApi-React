import * as SceneActions from "../actions/scene";

const initialState = {
  cubes: [] as [],
};

export default function scene(state = initialState, action?: any) {
  switch (action.type) {
    case SceneActions.ADD_CUBE: {
      const { cube } = action.payload;
      return {
        ...state,
        cubes: [...state.cubes, cube],
      };
    }
    case SceneActions.REMOVE_CUBE: {
      const { id } = action.payload;
      return {
        ...state,
        cubes: state.cubes.filter((c) => c["customId"] !== id),
      };
    }

    case SceneActions.SET_SCENE: {
      const { cubes } = action.payload;
      return {
        cubes,
      };
    }
    default: {
      return state;
    }
  }
}
