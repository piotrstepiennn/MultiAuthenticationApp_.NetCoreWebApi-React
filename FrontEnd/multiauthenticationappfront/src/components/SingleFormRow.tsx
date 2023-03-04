import React from "react";

interface Props {
  type: string;
  name: string;
  value: string;
  handleChange: any;
  labelText: string;
}

export const SingleFormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
}: Props) => {
  return (
    <div className="form__input-container">
      <input
        placeholder=" "
        className="form__input"
        type={type}
        id={name}
        name={name}
        onChange={handleChange}
        value={value}
        required
      />
      <label className="form__input-label" htmlFor={name}>
        {labelText}
      </label>
    </div>
  );
};
