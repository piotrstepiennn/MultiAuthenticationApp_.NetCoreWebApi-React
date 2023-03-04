"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
//import { useSelector, useDispatch, useStore } from "react-redux";
const hooks_1 = require("../hooks/hooks");
const SingleFormRow_1 = require("./SingleFormRow");
//import { addUserToLocalStorage } from "../features/localStorage";
const userSlice_1 = require("../features/userSlice");
const LoginForm = ({ Title }) => {
    (0, react_2.useEffect)(() => {
        document.title = Title;
    }, []);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const initialState = {
        username: "",
        password: "",
        isError: false,
        errorMsg: "",
    };
    const [values, setValues] = (0, react_2.useState)(initialState);
    const { user, isLoading } = (0, hooks_1.useAppSelector)((store) => store.user);
    (0, react_2.useEffect)(() => {
        if (user) {
            navigate("/auth");
        }
    }, [user, navigate]);
    //const dispatch = useDispatch();
    //   useEffect(() => {
    //     setErrorMessage("");
    //   }, [username, password]);
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues(Object.assign(Object.assign({}, values), { [name]: value }));
        const isEmpty = Object.values(values).every((x) => x === null || x === "");
        if (!isEmpty) {
            document.getElementById("sendmail").disabled =
                false;
        }
        if (values.isError === true) {
            setValues(Object.assign(Object.assign({}, values), { errorMsg: "", isError: false }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = values;
        dispatch((0, userSlice_1.loginUser)({
            username: username,
            password: password,
        }));
        return;
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Login"),
        react_1.default.createElement("form", { className: "form", id: "loginForm", autoComplete: "off", onSubmit: handleSubmit, method: "POST" },
            react_1.default.createElement(SingleFormRow_1.SingleFormRow, { type: "text", name: "username", value: values.username, handleChange: handleChange, labelText: "Username" }),
            react_1.default.createElement(SingleFormRow_1.SingleFormRow, { type: "password", name: "password", value: values.password, handleChange: handleChange, labelText: "Password" }),
            react_1.default.createElement("div", { className: "form__spacer", "aria-hidden": "true" }),
            react_1.default.createElement("button", { id: "sendmail", type: "submit", className: "form__button", disabled: true }, "Login"),
            react_1.default.createElement("a", { href: "register" }, "Need an account? Sign Up!"),
            values.isError && (react_1.default.createElement("div", { className: "alert_container" },
                react_1.default.createElement("h4", { className: "alert_message" },
                    " ",
                    values.errorMsg))),
            react_1.default.createElement("div", { className: "g-recaptcha", "data-sitekey": "6LcTf04eAAAAADvBL0c1AZdKzrMUH1-RvNgcgfFC" })),
        react_1.default.createElement("script", { src: "https://www.google.com/recaptcha/api.js", async: true, defer: true }),
        react_1.default.createElement("script", { src: "/captcha.js" })));
};
exports.default = LoginForm;
