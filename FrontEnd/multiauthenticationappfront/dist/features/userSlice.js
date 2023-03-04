"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.loginUser = exports.registerUser = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const react_toastify_1 = require("react-toastify");
const axios_1 = __importDefault(require("../api/axios"));
const initialState = {
    isLoading: false,
    registered: null,
    user: null,
    authenticated: false,
};
exports.registerUser = (0, toolkit_1.createAsyncThunk)("user/registerUser", (data, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield axios_1.default.post("/register", data);
        return data;
    }
    catch (error) {
        console.log(error.response.data.errors);
        //return thunkAPI.rejectWithValue(
        //Object.values(error.response.data.errors)[0].toString()
        //);
    }
}));
exports.loginUser = (0, toolkit_1.createAsyncThunk)("user/loginUser", (user, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield axios_1.default.post("/login", user);
        return resp.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.authUser = (0, toolkit_1.createAsyncThunk)("user/authUser", (user, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(user);
        const resp = yield axios_1.default.post("/auth", user);
        return resp.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
const userSlice = (0, toolkit_1.createSlice)({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.registerUser.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.registerUser.fulfilled, (state, user) => {
            state.isLoading = false;
            //state.registered = user;
            //toast.success(`Hello There ${user.payload.username}`);
        })
            .addCase(exports.registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            //toast.error(payload);
        })
            //login
            .addCase(exports.loginUser.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.loginUser.fulfilled, (state, { payload }) => {
            const user = { payload };
            state.isLoading = false;
            //state.user = user;
            react_toastify_1.toast.success(`Authenticate yourself!`);
        })
            .addCase(exports.loginUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            //toast.error(payload);
        })
            //authentication
            .addCase(exports.authUser.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.authUser.fulfilled, (state, { payload }) => {
            //const user = { payload };
            state.isLoading = false;
            state.authenticated = true;
            //state.user = user;
            react_toastify_1.toast.success(`Solve The Catpcha!`);
        })
            .addCase(exports.authUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            //toast.error(payload);
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
exports.default = userSlice.reducer;
