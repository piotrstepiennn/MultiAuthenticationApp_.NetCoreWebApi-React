import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { useSelector, useDispatch, useStore } from "react-redux";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { SingleFormRow } from "./SingleFormRow";
//import { addUserToLocalStorage } from "../features/localStorage";
import { loginUser } from "../reducer/userSlice";

type Props = { Title: string };
const LoginForm = ({ Title }: Props) => {
  useEffect(() => {
    document.title = Title;
  }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialState = {
    username: "",
    password: "",
    isError: false,
    errorMsg: "",
  };

  const [values, setValues] = useState(initialState);
  const { user, isLoading, solvedCaptcha } = useAppSelector(
    (store) => store.user
  );
  useEffect(() => {
    if (user) {
      navigate("/auth");
    }
    if (solvedCaptcha === false) {
      navigate("/");
    }
  }, [user, navigate]);
  //const dispatch = useDispatch();

  //   useEffect(() => {
  //     setErrorMessage("");
  //   }, [username, password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    const isEmpty = Object.values(values).every((x) => x === null || x === "");
    if (!isEmpty) {
      (document.getElementById("sendmail") as HTMLButtonElement).disabled =
        false;
    }
    if (values.isError === true) {
      setValues({
        ...values,
        errorMsg: "",
        isError: false,
      });
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = values;

    dispatch(
      loginUser({
        username: username,
        password: password,
      })
    );

    return;
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="container">
        <form
          className="form"
          id="loginForm"
          autoComplete="off"
          onSubmit={handleSubmit}
          method="POST"
        >
          <SingleFormRow
            type="text"
            name="username"
            value={values.username}
            handleChange={handleChange}
            labelText="Username"
          />

          <SingleFormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            labelText="Password"
          />
          <div className="form__spacer" aria-hidden="true"></div>

          <button
            id="sendmail"
            type="submit"
            className="form__button"
            disabled={true}
          >
            Login
          </button>

          {values.isError && (
            <div className="alert_container">
              <h4 className="alert_message"> {values.errorMsg}</h4>
            </div>
          )}
          {/* <br>           */}
          <div
            className="g-recaptcha"
            data-sitekey="6LcTf04eAAAAADvBL0c1AZdKzrMUH1-RvNgcgfFC"
          ></div>
          {/* <br> */}
        </form>
        <a href="register">Need an account? Sign Up!</a>
      </div>
      <script
        src="https://www.google.com/recaptcha/api.js"
        async
        defer
      ></script>
      <script src="/captcha.js"></script>
    </div>
  );
};

export default LoginForm;
