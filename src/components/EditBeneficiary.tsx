import * as React from "react";
import InputField from "./InputField";
import Button from "./Button";
import { IBeneficiary } from "../Interfaces";

interface IEditBeneficiaryProps {
  currentBeneficiary: IBeneficiary;
  handleClose(): void;
  handleEdit(beneficiary: IBeneficiary): void;
  updateList(): void;
  beneficiaryList: Array<IBeneficiary>;
}

const EditBeneficiary: React.FunctionComponent<IEditBeneficiaryProps> = (
  props
) => {
  const [error, setError] = React.useState("");
  const handleUpdate = (value: string, key: string): void => {
    const updatedBeneficiary = {
      ...props.currentBeneficiary,
      [key]: value,
    };

    props.handleEdit(updatedBeneficiary);
  };

  const validationChecks = (): boolean => {
    // Check if all fields have been completed
    if (
      props.currentBeneficiary.name === "" ||
      props.currentBeneficiary.surname === "" ||
      props.currentBeneficiary.email === ""
    ) {
      setError("Please make you have entered a Name Surname and Email");
      return false;
    }

    const validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!validEmailRegex.test(props.currentBeneficiary.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const editBeneficiary = () => {
    const validation = validationChecks();
    if (!validation) {
      return;
    }
    props.updateList();
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={props.handleClose} className="close">
          &times;
        </span>
        <h1>Edit Beneficiary</h1>
        <form>
          {error && <p className="error-text">{error}</p>}
          <div>
            <InputField
              id="beneficiary-name"
              label="Beneficiary Name"
              value={props.currentBeneficiary.name}
              handleChange={(value) => handleUpdate(value, "name")}
            />
          </div>
          <div>
            <InputField
              id="beneficiary-surname"
              label="Beneficiary Surname"
              value={props.currentBeneficiary.surname}
              handleChange={(value) => handleUpdate(value, "surname")}
            />
          </div>
          <div>
            <InputField
              id="beneficiary-email"
              label="Beneficiary Email Address"
              value={props.currentBeneficiary.email}
              handleChange={(value) => handleUpdate(value, "email")}
            />
          </div>
          <Button callbackFn={editBeneficiary} text="Edit Beneficiary" />
        </form>
      </div>
    </div>
  );
};

export default EditBeneficiary;
