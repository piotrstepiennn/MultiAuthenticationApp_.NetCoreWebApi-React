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
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("react");
const SingleFormRow_1 = require("./SingleFormRow");
//import { useSelector, useDispatch, useStore } from "react-redux";
const hooks_1 = require("../hooks/hooks");
const userSlice_1 = require("../features/userSlice");
const questions_json_1 = __importDefault(require("./questions.json"));
const RegisterForm = ({ Title }) => {
    const { registered } = (0, hooks_1.useAppSelector)((store) => store.user);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_2.useEffect)(() => {
        document.title = Title;
        if (registered) {
            navigate("/");
        }
    }, [Title, registered, navigate]);
    const initialState = {
        username: "",
        password: "",
        confirmPassword: "",
        mobilePassword: "",
        authPassword: "",
        email: "",
        question: "car",
        answer: "",
        isError: false,
        errorMsg: "Unexpected Error, try again.",
    };
    const [values, setValues] = (0, react_2.useState)(initialState);
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues(Object.assign(Object.assign({}, values), { [name]: value }));
        const isEmpty = Object.values(values).every((x) => x === null || x === "");
        if (!isEmpty) {
            document.getElementById("registerButton").disabled = false;
        }
        if (values.isError === true) {
            setValues(Object.assign(Object.assign({}, values), { errorMsg: "", isError: false }));
        }
    };
    const handleRegister = (e) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password, confirmPassword, mobilePassword, authPassword, email, question, answer, } = values;
        e.preventDefault();
        // const user = {
        //   username: username,
        //   password: password,
        //   mobilePassword: mobilePassword,
        //   email: email,
        //   question: question,
        //   answer: answer,
        // };
        if (password !== confirmPassword) {
            setValues(Object.assign(Object.assign({}, values), { errorMsg: "Password confirmation does not match.", isError: true }));
            return;
        }
        dispatch((0, userSlice_1.registerUser)({
            username: username,
            password: password,
            mobilePassword: mobilePassword,
            authPassword: authPassword,
            email: email,
            question: question,
            answer: answer,
        }));
        // console.log(registerError);
        // if (registerError === false) {
        //   navigate("/");
        //}
        // try {
        //   if (password !== confirmPassword) {
        //     setValues({
        //       ...values,
        //       errorMsg: "Password confirmation does not match.",
        //       isError: true,
        //     });
        //     return;
        //   }
        //   const resp = await axios.post("/register", user);
        //   setValues({
        //     ...values,
        //     errorMsg:
        //       "Account Created! You're going to be redirected to login page in 5 sec.",
        //     isError: true,
        //   });
        //   setTimeout(() => {
        //     navigate("/");
        //   }, 5000);
        // } catch (error) {
        //   console.log(error);
        //   if (error.code === "ERR_NETWORK") {
        //     setValues({
        //       ...values,
        //       errorMsg: "Unexpected Error occured, try again.",
        //       isError: true,
        //     });
        //   } else {
        //     setValues({
        //       ...values,
        //       errorMsg: error.response.data.title,
        //       isError: true,
        //     });
        //   }
        //}
        return;
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Sign Up!"),
        react_1.default.createElement("form", { name: "registerForm", className: "form", autoComplete: "off", method: "POST", onSubmit: handleRegister },
            react_1.default.createElement(SingleFormRow_1.SingleFormRow, { type: "text", name: "username", value: values.username, handleChange: handleChange, labelText: "Username" }),
            react_1.default.createElement(SingleFormRow_1.SingleFormRow, { type: "password", name: "password", value: values.password, handleChange: handleChange, labelText: "Password" }),
            react_1.default.createElement(SingleFormRow_1.SingleFormRow, { type: "password", name: "confirmPassword", value: values.confirmPassword, handleChange: handleChange, labelText: "Confirm Password" }),
            react_1.default.createElement(SingleFormRow_1.SingleFormRow, { type: "password", name: "mobilePassword", value: values.mobilePassword, handleChange: handleChange, labelText: "Mobile App Password" }),
            react_1.default.createElement(SingleFormRow_1.SingleFormRow, { type: "password", name: "authPassword", value: values.authPassword, handleChange: handleChange, labelText: "Additional Auth Password" }),
            react_1.default.createElement(SingleFormRow_1.SingleFormRow, { type: "email", name: "email", value: values.email, handleChange: handleChange, labelText: "E-mail" }),
            react_1.default.createElement("div", { className: "form__input-container" },
                react_1.default.createElement("p", null, "Authentication question"),
                react_1.default.createElement("select", { name: "question", id: "", onChange: handleChange, value: values.question }, questions_json_1.default.questions.map((question) => (react_1.default.createElement("option", { value: question.questionType, key: question.questionType }, question.longQuestion))))),
            react_1.default.createElement(SingleFormRow_1.SingleFormRow, { type: "text", name: "answer", value: values.answer, handleChange: handleChange, labelText: "Answer" }),
            react_1.default.createElement("div", { className: "form__spacer", "aria-hidden": "true" }),
            react_1.default.createElement("button", { type: "submit", className: "form__button", id: "registerButton", disabled: true }, "Create Account"),
            values.isError && (react_1.default.createElement("div", { className: "alert_container" },
                react_1.default.createElement("h4", { className: "alert_message" },
                    " ",
                    values.errorMsg))))));
};
exports.default = RegisterForm;
