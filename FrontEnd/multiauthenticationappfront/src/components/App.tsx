import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import AuthForm from "./AuthForm";
import UserPanel from "./userPanel";
import LoginForm from "./LoginForm";
import StartPage from "./StartPage";
import CaptchaRedirect from "./CaptchaRedirect";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "../features/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "../../public/style.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage Title="Hello" />} />
        <Route path="/captcha" element={<CaptchaRedirect />} />
        <Route path="/login" element={<LoginForm Title="Login" />} />
        <Route path="/register" element={<RegisterForm Title="Register" />} />
        <Route path="*" element={<StartPage Title="Hello" />} />

        <Route
          path="/auth"
          element={
            <ProtectedRoute>
              <AuthForm Title="Authentication" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/userPanel"
          element={
            <ProtectedRoute>
              <UserPanel Title="User Panel" />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
}

export default App;
