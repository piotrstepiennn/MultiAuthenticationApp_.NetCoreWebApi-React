import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SingleFormRow } from "./SingleFormRow";
//import { useSelector, useDispatch, useStore } from "react-redux";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { registerUser } from "../features/userSlice";
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

    const isEmpty = Object.values(values).every((x) => x === null || x === "");
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

    if (password !== confirmPassword) {
      setValues({
        ...values,
        errorMsg: "Password confirmation does not match.",
        isError: true,
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
      })
    );
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
          type="password"
          name="authPassword"
          value={values.authPassword}
          handleChange={handleChange}
          labelText="Additional Auth Password"
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
            {data.questions.map((question) => (
              <option value={question.questionType} key={question.questionType}>
                {question.longQuestion}
              </option>
            ))}
            {/* <option value="car">Favourite car brand</option>
            <option value="game">Favourite computer game</option> */}
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
  );
};

export default RegisterForm;
