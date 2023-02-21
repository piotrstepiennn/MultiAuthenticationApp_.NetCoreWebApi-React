import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import AuthForm from "./AuthForm";
import UserPanel from "./userPanel";
import LoginForm from "./LoginForm";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "../features/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm Title="Login" />} />
        <Route path="/register" element={<RegisterForm Title="Register" />} />

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
