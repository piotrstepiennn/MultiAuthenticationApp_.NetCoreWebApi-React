"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const UserPanel = ({ Title }) => {
    (0, react_2.useEffect)(() => {
        document.title = Title;
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "h" },
            react_1.default.createElement("h1", null, "Panel U\u017Cytkownika")),
        react_1.default.createElement("div", { className: "user-panel" },
            react_1.default.createElement("h4", null, "Witaj"),
            react_1.default.createElement("input", { type: "button", className: "form__button", value: "Zmie\u0144 Nazw\u0119 u\u017Cytkownika", id: "buttonChangeUsername" }),
            react_1.default.createElement("center", null,
                react_1.default.createElement("form", { id: "form", className: "form", autoComplete: "off", action: "/auth/userPanel/changeUsername", method: "POST" },
                    react_1.default.createElement("div", { className: "form__input-container" },
                        react_1.default.createElement("input", { "aria-label": "old_username", className: "form__input", type: "text", id: "old_user", placeholder: " ", name: "old_username", required: true }),
                        react_1.default.createElement("label", { className: "form__input-label", htmlFor: "old_username" }, "Obecna Nazwa")),
                    react_1.default.createElement("div", { className: "form__input-container" },
                        react_1.default.createElement("input", { "aria-label": "new_username", className: "form__input", type: "text", id: "new_user", placeholder: " ", name: "new_username", required: true }),
                        react_1.default.createElement("label", { className: "form__input-label", htmlFor: "new_username" }, "Nowa Nazwa")),
                    react_1.default.createElement("div", { className: "form__input-container" },
                        react_1.default.createElement("input", { "aria-label": "text", className: "form__input", type: "text", id: "new_username_confirm", placeholder: " ", name: "new_username_confirm", required: true }),
                        react_1.default.createElement("label", { className: "form__input-label", htmlFor: "new_username_confirm" }, "Powt\u00F3rz Now\u0105 Nazw\u0119")),
                    react_1.default.createElement("div", { className: "form__spacer", "aria-hidden": "true" }),
                    react_1.default.createElement("button", { type: "submit", className: "form__button", id: "buttonSubmit1" }, "Potwierd\u017A"))),
            react_1.default.createElement("input", { type: "button", className: "form__button", value: "Zmie\u0144 Has\u0142o", id: "buttonChangePassword" }),
            react_1.default.createElement("center", null,
                react_1.default.createElement("form", { id: "form2", className: "form", autoComplete: "off", action: "/auth/userPanel/changePassword", method: "POST" },
                    react_1.default.createElement("div", { className: "form__input-container" },
                        react_1.default.createElement("input", { "aria-label": "old_password", className: "form__input", type: "password", id: "old_password", placeholder: " ", name: "old_password", required: true }),
                        react_1.default.createElement("label", { className: "form__input-label", htmlFor: "old_password" }, "Obecne Has\u0142o")),
                    react_1.default.createElement("div", { className: "form__input-container" },
                        react_1.default.createElement("input", { "aria-label": "new_password", className: "form__input", type: "password", id: "new_password", placeholder: " ", name: "new_password", required: true }),
                        react_1.default.createElement("label", { className: "form__input-label", htmlFor: "new_password" }, "Nowe Has\u0142o")),
                    react_1.default.createElement("div", { className: "form__input-container" },
                        react_1.default.createElement("input", { "aria-label": "Password", className: "form__input", type: "password", id: "password", placeholder: " ", name: "new_password_confirm", required: true }),
                        react_1.default.createElement("label", { className: "form__input-label", htmlFor: "password" }, "Powt\u00F3rz Nowe Has\u0142o")),
                    react_1.default.createElement("div", { className: "form__spacer", "aria-hidden": "true" }),
                    react_1.default.createElement("button", { type: "submit", className: "form__button", id: "buttonSubmit2" }, "Potwierd\u017A"))),
            react_1.default.createElement("input", { type: "button", className: "form__button", value: "Zmie\u0144 Email", id: "buttonChangeEmail" }),
            react_1.default.createElement("center", null,
                react_1.default.createElement("form", { id: "form3", className: "form", autoComplete: "off", action: "/auth/userPanel/changeEmail", method: "POST" },
                    react_1.default.createElement("div", { className: "form__input-container" },
                        react_1.default.createElement("input", { "aria-label": "old_email", className: "form__input", type: "email", id: "old_email", placeholder: " ", name: "old_email", required: true }),
                        react_1.default.createElement("label", { className: "form__input-label", htmlFor: "old_email" }, "Obecny Email")),
                    react_1.default.createElement("div", { className: "form__input-container" },
                        react_1.default.createElement("input", { "aria-label": "new_email", className: "form__input", type: "email", id: "user", placeholder: " ", name: "new_email", required: true }),
                        react_1.default.createElement("label", { className: "form__input-label", htmlFor: "new_email" }, "Nowy Email")),
                    react_1.default.createElement("div", { className: "form__input-container" },
                        react_1.default.createElement("input", { "aria-label": "new_email_confirm", className: "form__input", type: "email", id: "new_email_confirm", placeholder: " ", name: "new_email_confirm", required: true }),
                        react_1.default.createElement("label", { className: "form__input-label", htmlFor: "new_email_confirm" }, "Powt\u00F3rz Nowy Email")),
                    react_1.default.createElement("div", { className: "form__spacer", "aria-hidden": "true" }),
                    react_1.default.createElement("button", { type: "submit", className: "form__button", id: "buttonSubmit3" }, "Potwierd\u017A"))),
            react_1.default.createElement("div", { className: "alert_container" }),
            react_1.default.createElement("div", { className: "form__spacer", "aria-hidden": "true" }),
            react_1.default.createElement("a", { className: "form__button", href: "/logout" }, "Wyloguj")),
        react_1.default.createElement("script", { src: "/open_form_on_button_click.js" })));
};
exports.default = UserPanel;
