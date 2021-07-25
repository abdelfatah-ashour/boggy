import React from "react";

export const InputFormRegister = ({
  name,
  type,
  title,
  handleForm,
  placeholder,
  date,
}) => {
  return (
    <div onChange={handleForm} className="col-12 mb-3 mx-auto">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        name={name}
        className="form-control"
        defaultValue={date}
      />
    </div>
  );
};
