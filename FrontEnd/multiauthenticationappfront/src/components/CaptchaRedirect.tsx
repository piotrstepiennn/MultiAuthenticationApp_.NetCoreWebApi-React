import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Builder from "./Builder";
const CaptchaRedirect = () => {
  //const navigate = useNavigate();
  // useEffect(() => {
  //   //window.location.replace("http://localhost:4000");
  //   navigate("/captcha");
  // }, []);

  return <Builder />;
};

export default CaptchaRedirect;
