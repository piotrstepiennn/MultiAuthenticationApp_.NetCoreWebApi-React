"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const SingleFormRow_1 = require("./SingleFormRow");
const react_router_dom_1 = require("react-router-dom");
//import { useSelector, useDispatch, useStore } from "react-redux";
const hooks_1 = require("../hooks/hooks");
const userSlice_1 = require("../features/userSlice");
const AuthForm = ({ Title }) => {
    (0, react_2.useEffect)(() => {
        document.title = Title;
    }, [Title]);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { user, authenticated } = (0, hooks_1.useAppSelector)((store) => store.user);
    // let authQuestionType = user.payload.authQuestion;
    // let authQuestionObject = data.questions.filter(
    //   (question) => question.questionType === authQuestionType
    // );
    // let authQuestion = authQuestionObject.map(
    //   (question) => question.longQuestion
    // );
    const initialState = {
        emailCode: "",
        mobileAppCode: "",
        randomPassword: "",
        questionAnswer: "",
        isError: false,
        errorMsg: "",
    };
    (0, react_2.useEffect)(() => {
        if (authenticated === true) {
            console.log("navigate to custom captcha!");
            //navigate("/auth");
        }
    }, [authenticated, navigate]);
    const [values, setValues] = (0, react_2.useState)(initialState);
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues(Object.assign(Object.assign({}, values), { [name]: value }));
        const isEmpty = Object.values(values).every((x) => x === null || x === "");
        if (!isEmpty) {
            document.getElementById("authButton").disabled =
                false;
        }
        if (values.isError === true) {
            setValues(Object.assign(Object.assign({}, values), { errorMsg: "", isError: false }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { emailCode, mobileAppCode, randomPassword, questionAnswer } = values;
        dispatch((0, userSlice_1.authUser)({
            //username: user.payload.userName,
            //EmailAuthcode: emailCode,
            MobileAppAuthcode: mobileAppCode,
            AuthPassword: randomPassword,
            Answer: questionAnswer,
        }));
        return;
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Authentication"),
        react_1.default.createElement("form", { className: "authenticationForm", autoComplete: "off", onSubmit: handleSubmit, method: "POST" },
            react_1.default.createElement("div", { className: "form__icon", "aria-hidden": "true" }),
            react_1.default.createElement("h4", null, "Enter the code that was sent to your email"),
            react_1.default.createElement(SingleFormRow_1.SingleFormRow, { type: "text", name: "emailCode", value: values.emailCode, handleChange: handleChange, labelText: "Email Code" }),
            react_1.default.createElement("h4", null, "Enter the code displayed on your mobile phone"),
            react_1.default.createElement(SingleFormRow_1.SingleFormRow, { type: "text", name: "mobileAppCode", value: values.mobileAppCode, handleChange: handleChange, labelText: "MobileApp Code" }),
            react_1.default.createElement("h4", null, "Enter the appropriate letters of the authentication password"),
            react_1.default.createElement(SingleFormRow_1.SingleFormRow, { type: "text", name: "randomPassword", value: values.randomPassword, handleChange: handleChange, labelText: "Password Letters" }),
            react_1.default.createElement("h4", null, "Answer the authentication question"),
            react_1.default.createElement(SingleFormRow_1.SingleFormRow, { type: "text", name: "questionAnswer", value: values.questionAnswer, handleChange: handleChange, labelText: "Your answer" }),
            react_1.default.createElement("div", { className: "form__spacer", "aria-hidden": "true" }),
            react_1.default.createElement("button", { type: "submit", className: "form__button", id: "authButton" }, "Login"),
            react_1.default.createElement("div", { className: "alert_container" }))));
};
exports.default = AuthForm;
