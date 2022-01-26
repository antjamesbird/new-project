import * as React from "react";
import { IBeneficiary } from "../Interfaces";

interface ISuccessScreenProps {
  beneficiaryList: Array<IBeneficiary>;
}

const SuccessScreen: React.FunctionComponent<ISuccessScreenProps> = (props) => {
  return (
    <div>
      <h1>You are all signed up!</h1>
      <p>You have added the following Beneficiaries</p>
      {props.beneficiaryList.map((item) => (
        <p key={item.name}>
          {item.name} {item.surname}
        </p>
      ))}
    </div>
  );
};

export default SuccessScreen;
