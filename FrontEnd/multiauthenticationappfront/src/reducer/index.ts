import { combineReducers } from "redux";

import builder from "./builder";
import scene from "./scene";
import userSlice from "./userSlice";
export default combineReducers({
  builder: builder,
  scene: scene,
  user: userSlice,
});
