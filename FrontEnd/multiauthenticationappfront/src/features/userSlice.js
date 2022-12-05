import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
  isLoading: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
});

// export const registerUser = createAsyncThunk(
//   "user/registerUser",
//   async (user, thunkAPI) => {
//     try {
//       const resp = await axios.post("/register", user);
//       console.log(resp);
//     } catch (error) {

//       console.log(error);
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async (user, thunkAPI) => {
//     console.log(`Login User : ${user}`);
//   }
// );

export default userSlice.reducer;
