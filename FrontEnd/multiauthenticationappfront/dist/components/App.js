"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const RegisterForm_1 = __importDefault(require("./RegisterForm"));
const AuthForm_1 = __importDefault(require("./AuthForm"));
const userPanel_1 = __importDefault(require("./userPanel"));
const LoginForm_1 = __importDefault(require("./LoginForm"));
const react_toastify_1 = require("react-toastify");
const ProtectedRoute_1 = require("../features/ProtectedRoute");
require("react-toastify/dist/ReactToastify.css");
function App() {
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(LoginForm_1.default, { Title: "Login" }) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/register", element: react_1.default.createElement(RegisterForm_1.default, { Title: "Register" }) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/auth", element: react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, null,
                    react_1.default.createElement(AuthForm_1.default, { Title: "Authentication" })) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/userPanel", element: react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, null,
                    react_1.default.createElement(userPanel_1.default, { Title: "User Panel" })) })),
        react_1.default.createElement(react_toastify_1.ToastContainer, { position: "top-center" })));
}
exports.default = App;
