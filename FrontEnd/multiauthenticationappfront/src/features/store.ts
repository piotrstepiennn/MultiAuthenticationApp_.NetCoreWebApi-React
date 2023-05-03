import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
//import userSlice from "../reducer/userSlice";
//import builder from "../reducer/builder";
//import scene from "../reducer/scene";
import reducer from "../reducer";
export function setupStore(initialState?: any) {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
}

export const store = setupStore();

// export const store = configureStore({
//   reducer: {
//     builder: builder,
//     scene: scene,
//     user: userSlice,
//   },
// });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
