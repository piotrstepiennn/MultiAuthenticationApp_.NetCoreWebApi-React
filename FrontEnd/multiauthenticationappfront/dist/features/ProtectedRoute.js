"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoute = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
//import { useSelector } from "react-redux";
const hooks_1 = require("../hooks/hooks");
const ProtectedRoute = ({ children }) => {
    const { user } = (0, hooks_1.useAppSelector)((store) => store.user);
    if (!user) {
        return react_1.default.createElement(react_router_dom_1.Navigate, { to: "/" });
    }
    return children;
};
exports.ProtectedRoute = ProtectedRoute;
exports.default = exports.ProtectedRoute;
