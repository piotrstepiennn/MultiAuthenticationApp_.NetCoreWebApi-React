import React from "react";
import { useState, useEffect } from "react";
import { SingleFormRow } from "./SingleFormRow";

const AuthForm = ({ Title }) => {
  useEffect(() => {
    document.title = Title;
  });

  const initialState = {
    emailCode: "",
    mobileAppCode: "",
    randomPassword: "",
    questionAnswer: "",
    isError: false,
    errorMsg: "",
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    const isEmpty = Object.values(values).every((x) => x === null || x === "");
    if (!isEmpty) {
      document.getElementById("authButton").disabled = false;
    }
    if (values.isError === true) {
      setValues({
        ...values,
        errorMsg: "",
        isError: false,
      });
    }
  };

  return (
    <div>
      <h1>Authentication</h1>

      <form
        className="authenticationForm"
        autoComplete="off"
        action="/auth/userPanel"
        method="POST"
      >
        <div className="form__icon" aria-hidden="true"></div>
        <h4>Proszę podać kod z emaila</h4>
        <SingleFormRow
          type="text"
          name="kod"
          value={values.emailCode}
          handleChange={handleChange}
          labelText="Kod Dostępu Email"
        />
        <h4>Proszę podać kod z aplikacji mobilnej</h4>
        <SingleFormRow
          type="text"
          name="kod2"
          value={values.mobileAppCode}
          handleChange={handleChange}
          labelText="Kod z Aplikacji Mobilnej"
        />
        <h4>Proszę podać odpowiednie litery hasła uwierzytelniającego</h4>
        {/* <p>Numery liter: {{num1}} {{num2}} {{num3}} {{num4}}</p> */}
        <SingleFormRow
          type="text"
          name="pin"
          value={values.randomPassword}
          handleChange={handleChange}
          labelText="Litery Hasła"
        />
        <h4>Odpowiedz na pytanie weryfikujące</h4>
        {/* <p> {{Question}} </p> */}
        <SingleFormRow
          type="text"
          name="answer"
          value={values.questionAnswer}
          handleChange={handleChange}
          labelText="Odpowiedź"
        />
        <div className="form__spacer" aria-hidden="true"></div>
        <button type="submit" className="form__button" id="authButton">
          Zaloguj
        </button>
        <div className="alert_container">
          {/* {{#if message }}

            <h4 className="alert_message"> {{message}} </h4>

        {{/if}} */}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
