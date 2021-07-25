import React from "react";
import Style from "../../public/assets/css/uploadProduct.module.css";

export const InputUploadProduct = ({
  name,
  label,
  type,
  placeholder,
  handleInput,
}) => {
  return (
    <div className="mb-3 col-12">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleInput}
      />
    </div>
  );
};

export const InputSelect = ({ name, titles, label, handleInput }) => {
  return (
    <div className="mb-3 col-12">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className="form-select"
        aria-label="Default select example"
        name={name}
        defaultValue={"DEFAULT"}
        onChange={handleInput}>
        <option value="DEFAULT" disabled>
          Choose a {label} ...
        </option>
        {titles.map((title, index) => {
          return (
            <React.Fragment key={index}>
              <option value={title}>{title}</option>
            </React.Fragment>
          );
        })}
      </select>
    </div>
  );
};

export const GroupChecked = ({ name, label, handleInput, optionList }) => {
  return (
    <div
      id="groupChecked"
      className={Style.GroupChecked}
      onChange={handleInput}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <ul className={Style.listOfChecked}>
        {optionList.map((option, index) => {
          return (
            <li className={Style.itemChecked} key={index}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={name}
                  value={option.value}
                  id={option.name}
                />
                <label className="form-check-label" htmlFor={option.value}>
                  {option.value}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
