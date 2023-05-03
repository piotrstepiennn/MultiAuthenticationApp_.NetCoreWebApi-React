import React from "react";

const Button = ({ text, onClick }: any) => (
  <div className="button" onClick={onClick}>
    <div className="text">{text}</div>
  </div>
);

export default Button;
