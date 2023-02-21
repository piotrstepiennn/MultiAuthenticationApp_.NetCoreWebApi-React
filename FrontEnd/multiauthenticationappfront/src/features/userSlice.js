import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../api/axios";

const initialState = {
  isLoading: false,
  registerError: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.post("/register", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.title);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await axios.post("/login", user);
      console.log(resp);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, user) => {
        state.isLoading = false;
        state.registerError = false;
        toast.success(`Hello There ${user.payload.username}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.registerError = true;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const user = { payload };
        state.isLoading = false;
        state.user = user;
        toast.success(`Authenticate yourself!`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

// extraReducers: {
//     extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(registerUser.fulfilled, (state, { payload: {user} }) => {
//         state.isLoading = false;
//         state.user = user;
//         toast.success(`Hello There ${user.name}`);
//       })
//       .addCase(registerUser.rejected, (state, { payload }) => {
//         state.isLoading = false;
//         toast.error(payload);
//       });
//   }
// }

export default userSlice.reducer;
