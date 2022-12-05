import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SingleFormRow } from "./SingleFormRow";
import { useSelector, useDispatch } from "react-redux";
import axios from "../api/axios";

const RegisterForm = ({ Title }) => {
  useEffect(() => {
    document.title = Title;
  }, [Title]);

  const { user, isLoading } = useSelector((store) => store.user);
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
    mobilePassword: "",
    email: "",
    question: "car",
    answer: "",
    isError: false,
    errorMsg: "Unexpected Error, try again.",
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleRegister = async (e) => {
    const {
      username,
      password,
      confirmPassword,
      mobilePassword,
      email,
      question,
      answer,
      errorMsg,
      isError,
    } = values;
    e.preventDefault();

    const user = {
      username: username,
      password: password,
      mobilePassword: mobilePassword,
      email: email,
      question: question,
      answer: answer,
    };
    try {
      if (password !== confirmPassword) {
        setValues({
          ...values,
          isError: true,
        });
        throw new Error("Confirm password does not match!");
      }
      const resp = await axios.post("/register", user);
      setValues({
        ...values,
        errorMsg:
          "Account Created! You're going to be redirected to login page in 5 sec.",
        isError: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      setValues({
        ...values,
        errorMsg: error.response.data.title,
        isError: true,
      });
    }

    // dispatch(
    //   registerUser({
    //     username: username,
    //     password: password,
    //     confirmPassword: confirmPassword,
    //     mobilePassword: mobilePassword,
    //     email: email,
    //     question: question,
    //     answer: answer,
    //   })
    // );
    return;
  };

  return (
    <div>
      <h1>Sign Up!</h1>

      <form
        name="registerForm"
        className="form"
        autoComplete="off"
        method="POST"
        onSubmit={handleRegister}
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

        <SingleFormRow
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          handleChange={handleChange}
          labelText="Confirm Password"
        />

        <SingleFormRow
          type="password"
          name="mobilePassword"
          value={values.mobilePassword}
          handleChange={handleChange}
          labelText="Mobile App Password"
        />

        <SingleFormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="E-mail"
        />

        <div className="form__input-container">
          <p>Authentication question</p>
          <select
            name="question"
            id=""
            onChange={handleChange}
            value={values.question}
          >
            <option value="car">Favourite car brand</option>
            <option value="game">Favourite computer game</option>
          </select>
        </div>

        <SingleFormRow
          type="text"
          name="answer"
          value={values.answer}
          handleChange={handleChange}
          labelText="Answer"
        />

        <div className="form__spacer" aria-hidden="true"></div>
        <button type="submit" className="form__button">
          Create Account
        </button>

        {values.isError && (
          <div className="alert_container">
            <h4 className="alert_message"> {values.errorMsg}</h4>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
