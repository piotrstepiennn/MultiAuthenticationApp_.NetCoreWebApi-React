import React from "react";
import { useEffect } from "react";
type Props = { Title: string };
const StartPage = ({ Title }: Props) => {
  useEffect(() => {
    document.title = Title;
  }, []);
  return (
    <div>
      <h1>Hello</h1>
      <div className="container">
        <a href="captcha">Do you want to log in? Solve the captcha first!</a>
        <a href="register">Need an account? Sign Up!</a>
      </div>
    </div>
  );
};

export default StartPage;
