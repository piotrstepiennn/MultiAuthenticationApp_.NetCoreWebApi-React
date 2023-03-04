"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleFormRow = void 0;
const react_1 = __importDefault(require("react"));
const SingleFormRow = ({ type, name, value, handleChange, labelText, }) => {
    return (react_1.default.createElement("div", { className: "form__input-container" },
        react_1.default.createElement("input", { placeholder: " ", className: "form__input", type: type, id: name, name: name, onChange: handleChange, value: value, required: true }),
        react_1.default.createElement("label", { className: "form__input-label", htmlFor: name }, labelText)));
};
exports.SingleFormRow = SingleFormRow;
