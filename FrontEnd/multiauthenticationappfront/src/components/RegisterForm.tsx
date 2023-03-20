import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SingleFormRow } from "./SingleFormRow";
//import { useSelector, useDispatch, useStore } from "react-redux";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { registerUser } from "../features/userSlice";
import { compareElements } from "../features/tools";
import data from "./questions.json";

type Props = { Title: string };
const RegisterForm = ({ Title }: Props) => {
  const { registered } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
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
    phoneNumber: "",
    isError: false,
    errorMsg: "Unexpected Error, try again.",
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });

    const isEmpty = Object.values(values).some((x) => x === null || x === "");
    if (!isEmpty) {
      (
        document.getElementById("registerButton") as HTMLButtonElement
      ).disabled = false;
    }
    if (values.isError === true) {
      setValues({
        ...values,
        errorMsg: "",
        isError: false,
      });
    }
  };

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    const {
      username,
      password,
      confirmPassword,
      mobilePassword,
      authPassword,
      email,
      question,
      answer,
      phoneNumber,
    } = values;
    e.preventDefault();

    // const user = {
    //   username: username,
    //   password: password,
    //   mobilePassword: mobilePassword,
    //   email: email,
    //   question: question,
    //   answer: answer,
    // };

    const check = compareElements(
      values.password,
      values.confirmPassword,
      "Password"
    );
    if (check.isError) {
      setValues({
        ...values,
        errorMsg: check.errorMsg,
        isError: check.isError,
      });
      return;
    }

    dispatch(
      registerUser({
        username: username,
        password: password,
        mobilePassword: mobilePassword,
        authPassword: authPassword,
        email: email,
        question: question,
        answer: answer,
        phoneNumber: phoneNumber,
      })
    );

    return;
  };

  return (
    <div>
      <h1>Sign Up!</h1>
      <div className="container">
        <form
          name="registerForm"
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
            type="password"
            name="authPassword"
            value={values.authPassword}
            handleChange={handleChange}
            labelText="Auth Password"
          />
          <SingleFormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
            labelText="E-mail"
          />
          <div className="auth">
            <SingleFormRow
              type="text"
              name="phoneNumber"
              value={values.phoneNumber}
              handleChange={handleChange}
              labelText="Phone Number"
            />
            <p>Authentication question</p>
            <select
              name="question"
              id=""
              onChange={handleChange}
              value={values.question}
            >
              {data.questions.map((question) => (
                <option
                  value={question.questionType}
                  key={question.questionType}
                >
                  {question.longQuestion}
                </option>
              ))}
            </select>
            <SingleFormRow
              type="text"
              name="answer"
              value={values.answer}
              handleChange={handleChange}
              labelText="Answer"
            />
          </div>

          <div className="form__spacer" aria-hidden="true"></div>
          <button
            type="submit"
            className="form__button"
            id="registerButton"
            disabled={true}
          >
            Create Account
          </button>
          {values.isError && (
            <div className="alert_container">
              <h4 className="alert_message"> {values.errorMsg}</h4>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
