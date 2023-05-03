import React from "react";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import {
  changeUserUsername,
  changeUserEmail,
  changeUserPassword,
} from "../reducer/userSlice";
import { SingleFormRow } from "./SingleFormRow";
import { compareElements } from "../features/tools";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../reducer/userSlice";
type Props = { Title: string };
const UserPanel = ({ Title }: Props) => {
  useEffect(() => {
    document.title = Title;
  });

  const initialState = {
    changeUsernameForm: false,
    changeEmailForm: false,
    changePasswordForm: false,
    currentUsername: "",
    newUsername: "",
    confirmNewUsername: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    currentEmail: "",
    newEmail: "",
    confirmNewEmail: "",
    isError: false,
    errorMsg: "",
  };

  const [values, setValues] = useState(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((store) => store.user);
  //console.log(user);

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

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleChangeUsername = async (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const check = compareElements(
      values.newUsername,
      values.confirmNewUsername,
      "Username"
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
      changeUserUsername({
        username: values.currentUsername,
        newUsername: values.newUsername,
        email: user.payload.email,
      })
    );
    return;
  };
  const handleChangePassword = async (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const check = compareElements(
      values.newPassword,
      values.confirmNewPassword,
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
      changeUserPassword({
        username: user.payload.userName,
        password: values.currentPassword,
        newPassword: values.newPassword,
      })
    );
    return;
  };
  const handleChangeEmail = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const check = compareElements(
      values.newEmail,
      values.confirmNewEmail,
      "Email"
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
      changeUserEmail({
        email: values.currentEmail,
        newEmail: values.newEmail,
        username: user.payload.userName,
      })
    );
    return;
  };
  return (
    <div>
      <div className="h">
        <h1>User Panel</h1>
        <h4>Hello {user.payload.userName}</h4>
      </div>

      <div className="container">
        <div className="user-panel">
          <input
            type="button"
            className="form__button"
            value="Change Username"
            id="buttonChangeUsername"
            onClick={(e) =>
              setValues({
                ...values,
                changeUsernameForm: !values.changeUsernameForm,
                changeEmailForm: false,
                changePasswordForm: false,
              })
            }
          />
          {values.changeUsernameForm && (
            <form
              id="form"
              className="form"
              autoComplete="off"
              onSubmit={handleChangeUsername}
              method="POST"
            >
              <SingleFormRow
                type="text"
                name="currentUsername"
                value={values.currentUsername}
                handleChange={handleChange}
                labelText="Current Username"
              />
              <SingleFormRow
                type="text"
                name="newUsername"
                value={values.newUsername}
                handleChange={handleChange}
                labelText="New Username"
              />
              <SingleFormRow
                type="text"
                name="confirmNewUsername"
                value={values.confirmNewUsername}
                handleChange={handleChange}
                labelText="Confirm New Username"
              />
              <div className="form__spacer" aria-hidden="true"></div>
              <button type="submit" className="form__button" id="buttonSubmit1">
                Confirm
              </button>
            </form>
          )}
          <input
            type="button"
            className="form__button"
            value="Change Password"
            id="buttonChangePassword"
            onClick={(e) =>
              setValues({
                ...values,
                changeUsernameForm: false,
                changeEmailForm: false,
                changePasswordForm: !values.changePasswordForm,
              })
            }
          />
          {values.changePasswordForm && (
            <form
              id="form2"
              className="form"
              autoComplete="off"
              onSubmit={handleChangePassword}
              method="POST"
            >
              <SingleFormRow
                type="text"
                name="currentPassword"
                value={values.currentPassword}
                handleChange={handleChange}
                labelText="Current Password"
              />
              <SingleFormRow
                type="text"
                name="newPassword"
                value={values.newPassword}
                handleChange={handleChange}
                labelText="New Password"
              />
              <SingleFormRow
                type="text"
                name="confirmNewPassword"
                value={values.confirmNewPassword}
                handleChange={handleChange}
                labelText="Confirm New Password"
              />
              <div className="form__spacer" aria-hidden="true"></div>
              <button type="submit" className="form__button" id="buttonSubmit2">
                Confirm
              </button>
            </form>
          )}

          <input
            type="button"
            className="form__button"
            value="Change Email"
            id="buttonChangeEmail"
            onClick={(e) =>
              setValues({
                ...values,
                changeUsernameForm: false,
                changeEmailForm: !values.changeEmailForm,
                changePasswordForm: false,
              })
            }
          />
          {values.changeEmailForm && (
            <form
              id="form3"
              className="form"
              autoComplete="off"
              onSubmit={handleChangeEmail}
              method="POST"
            >
              <SingleFormRow
                type="email"
                name="currentEmail"
                value={values.currentEmail}
                handleChange={handleChange}
                labelText="Current Email"
              />
              <SingleFormRow
                type="email"
                name="newEmail"
                value={values.newEmail}
                handleChange={handleChange}
                labelText="New Email"
              />
              <SingleFormRow
                type="email"
                name="confirmNewEmail"
                value={values.confirmNewEmail}
                handleChange={handleChange}
                labelText="Confirm New Email"
              />
              <div className="form__spacer" aria-hidden="true"></div>
              <button type="submit" className="form__button" id="buttonSubmit3">
                Confirm
              </button>
            </form>
          )}
          {values.isError && (
            <div className="alert_container">
              <h4 className="alert_message"> {values.errorMsg}</h4>
            </div>
          )}
          <div className="form__spacer" aria-hidden="true"></div>
          <input
            type="button"
            className="form__button"
            value="Logout"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
