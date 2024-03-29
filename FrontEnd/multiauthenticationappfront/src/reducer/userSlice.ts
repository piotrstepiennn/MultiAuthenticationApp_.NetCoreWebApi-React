import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../api/axios";
import { createHmac } from "crypto";

interface initialStateTypes {
  isLoading: boolean;
  registered: any | null;
  user: any | null;
  token: any | null;
  authenticated: boolean;
  solvedCaptcha: boolean;
  solvedCaptchaTime: Date;
  numberOfLoginAttempts: number;
}

interface user {
  username?: string;
  password?: string;
  mobilePassword?: string;
  authPassword?: string;
  email?: string;
  question?: string;
  answer?: string;
}

const initialState: initialStateTypes = {
  isLoading: false,
  registered: null,
  user: null,
  token: null,
  authenticated: false,
  solvedCaptcha: false,
  solvedCaptchaTime: null,
  numberOfLoginAttempts: 0,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data: object | null, thunkAPI: any) => {
    try {
      const resp = await axios.post("/register", data);
      return data;
    } catch (error: any) {
      let err: any;
      err = Object.values(error.response.data.errors)[0];
      return thunkAPI.rejectWithValue(err.toString());
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: object | null, thunkAPI: any) => {
    try {
      const secretKey = process.env.HASH_SECRETKEY;
      const login = JSON.stringify(user);
      const hmac = createHmac("sha1", secretKey);
      hmac.update(login);
      const hash = hmac.digest("base64");
      const data = { ...user, hash };
      const resp = await axios.post("/login", data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authUser = createAsyncThunk(
  "user/authUser",
  async (user: object | null, thunkAPI: any) => {
    try {
      const resp = await axios.post("/auth", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changeUserUsername = createAsyncThunk(
  "user/changeUsername",
  async (user: any, thunkAPI: any) => {
    try {
      console.log(user);
      const resp = await axios.post("/user/changeUsername", user, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      if (typeof error.response.data === "object") {
        let err: any;
        err = Object.values(error.response.data.errors)[0];
        return thunkAPI.rejectWithValue(err.toString());
      } else return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  "user/changePassword",
  async (user: object | null, thunkAPI: any) => {
    try {
      const resp = await axios.post("/user/changePassword", user);
      return resp.data;
    } catch (error) {
      if (typeof error.response.data === "object") {
        let err: any;
        err = Object.values(error.response.data.errors)[0];
        return thunkAPI.rejectWithValue(err.toString());
      } else return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changeUserEmail = createAsyncThunk(
  "user/changeEmail",
  async (user: object | null, thunkAPI: any) => {
    try {
      const resp = await axios.post("/user/changeEmail", user);
      return resp.data;
    } catch (error) {
      if (typeof error.response.data === "object") {
        let err: any;
        err = Object.values(error.response.data.errors)[0];
        return thunkAPI.rejectWithValue(err.toString());
      } else return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.authenticated = false;
      state.solvedCaptcha = false;
    },
    updateCaptchaResult: (state, result) => {
      //console.log(result);
      if (result.payload === true) {
        state.solvedCaptcha = true;
        state.solvedCaptchaTime = new Date();
        toast.success(`Captcha Solved!`);
      } else {
        state.solvedCaptcha = false;
        toast.error(`Captcha failed or expired!`);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, user: any) => {
        state.isLoading = false;
        state.registered = user;
        if (user.payload) toast.success(`Hello There ${user.payload.username}`);
      })
      .addCase(registerUser.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        toast.error(payload);
      })
      //login
      .addCase(loginUser.pending, (state) => {
        state.numberOfLoginAttempts += 1;
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const user = { payload };
        state.isLoading = false;
        state.user = user;
        state.token = payload.token;
        state.numberOfLoginAttempts = 0;
        console.log(user);
        toast.success(`Authenticate yourself!`);
      })
      .addCase(loginUser.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        toast.error(payload);
      })
      //authentication
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.authenticated = true;
        toast.success(`Success!`);
      })
      .addCase(authUser.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        toast.error(payload);
      })
      //changeUserUsername
      .addCase(changeUserUsername.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeUserUsername.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        toast.success(`Username changed!`);
      })
      .addCase(changeUserUsername.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        toast.error(payload);
      })
      //changeUserPassword
      .addCase(changeUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeUserPassword.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        toast.success(`Password changed!`);
      })
      .addCase(changeUserPassword.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        toast.error(payload);
      })
      //changeUserEmail
      .addCase(changeUserEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeUserEmail.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        toast.success(`Email changed!`);
      })
      .addCase(changeUserEmail.rejected, (state, { payload }: any) => {
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
export const { logoutUser, updateCaptchaResult } = userSlice.actions;
export default userSlice.reducer;
