"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const userSlice_1 = __importDefault(require("./userSlice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        user: userSlice_1.default,
    },
});
