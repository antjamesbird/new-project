import * as React from "react";

interface IButtonProps {
  callbackFn(): void;
  text: string;
}

const Button: React.FunctionComponent<IButtonProps> = (props) => {
  return (
    <a href="#!" className="button" onClick={props.callbackFn}>
      {props.text}
    </a>
  );
};

export default Button;
