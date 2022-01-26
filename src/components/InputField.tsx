import * as React from "react";

interface IInputProps {
  handleChange(value: string): void;
  value: string;
  id: string;
  label: string;
}

const InputField: React.FunctionComponent<IInputProps> = (props) => {
  return (
    <div className="input-field">
      <label htmlFor="beneficiary-name">{props.label}</label>
      <input
        className="inputField"
        id={props.id}
        onChange={(e) => props.handleChange(e.target.value)}
        value={props.value}
        type="text"
      />
    </div>
  );
};

export default InputField;
