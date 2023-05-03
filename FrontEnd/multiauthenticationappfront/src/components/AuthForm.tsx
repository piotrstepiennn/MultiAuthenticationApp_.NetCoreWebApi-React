import React from "react";
import { useState, useEffect } from "react";
import { SingleFormRow } from "./SingleFormRow";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { authUser } from "../reducer/userSlice";
import data from "./questions.json";

type Props = { Title: string };

const AuthForm = ({ Title }: Props) => {
  useEffect(() => {
    document.title = Title;
  }, [Title]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, authenticated } = useAppSelector((store) => store.user);

  const authQuestionType = user.payload.authQuestion;
  const authQuestionObject = data.questions.filter(
    (question) => question.questionType === authQuestionType
  );
  const authQuestion = authQuestionObject.map(
    (question) => question.longQuestion
  );

  const initialState = {
    emailCode: "",
    mobileAppCode: "",
    phoneAuthCode: "",
    randomPassword: "",
    questionAnswer: "",
    isError: false,
    errorMsg: "",
  };

  useEffect(() => {
    if (authenticated === true) {
      console.log("navigate to userPanel!");
      navigate("/userPanel");
    }
  }, [authenticated, navigate]);

  const [values, setValues] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    const isEmpty = Object.values(values).every((x) => x === null || x === "");
    if (!isEmpty) {
      (document.getElementById("authButton") as HTMLButtonElement).disabled =
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
    const {
      emailCode,
      mobileAppCode,
      randomPassword,
      questionAnswer,
      phoneAuthCode,
    } = values;

    if (user) {
      dispatch(
        authUser({
          username: user.payload.userName,
          EmailAuthcode: emailCode,
          MobileAppAuthcode: mobileAppCode,
          AuthPassword: randomPassword,
          Answer: questionAnswer,
          PhoneNumberAuthCode: phoneAuthCode,
        })
      );
    }

    return;
  };

  return (
    <div>
      <h1>Authentication</h1>
      <div className="container">
        <form
          className="authenticationForm"
          autoComplete="off"
          onSubmit={handleSubmit}
          method="POST"
        >
          <div className="form__icon" aria-hidden="true"></div>
          <h4>Enter the code that was sent to your email</h4>
          <SingleFormRow
            type="text"
            name="emailCode"
            value={values.emailCode}
            handleChange={handleChange}
            labelText="Email Code"
          />
          <h4>Enter the code displayed on your mobile phone</h4>
          <SingleFormRow
            type="text"
            name="mobileAppCode"
            value={values.mobileAppCode}
            handleChange={handleChange}
            labelText="MobileApp Code"
          />
          <h4>Enter the appropriate letters of the authentication password</h4>

          <SingleFormRow
            type="text"
            name="randomPassword"
            value={values.randomPassword}
            handleChange={handleChange}
            labelText="Password Letters"
          />
          <h4>Enter the code sent to your phone number.</h4>
          <SingleFormRow
            type="text"
            name="phoneAuthCode"
            value={values.phoneAuthCode}
            handleChange={handleChange}
            labelText="Phone Authcode"
          />
          <h4>Answer the authentication question</h4>
          <p> {authQuestion ? authQuestion : "Can't load AuthQuestion!"} </p>
          <SingleFormRow
            type="text"
            name="questionAnswer"
            value={values.questionAnswer}
            handleChange={handleChange}
            labelText="Your answer"
          />
          <div className="form__spacer" aria-hidden="true"></div>
          <button type="submit" className="form__button" id="authButton">
            Login
          </button>

          <div className="alert_container">
            {/* {{#if message }}

            <h4 className="alert_message"> {{message}} </h4>

        {{/if}} */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
