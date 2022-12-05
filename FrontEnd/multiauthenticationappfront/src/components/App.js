import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import Auth from "./Auth";
import UserPanel from "./userPanel";
import LoginForm from "./LoginForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm Title="Login" />} />
        <Route path="/register" element={<RegisterForm Title="Register" />} />

        {/* <Route element={<RequireAuth />}>
          <Route path="/Auth" element={<Auth Title="Authentication" />} />
          <Route path="/UserPanel" element={<UserPanel Title="User Panel" />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
