import * as React from "react";
import List from "./List";
import EditBeneficiary from "./EditBeneficiary";
import InputField from "./InputField";
import Button from "./Button";
import { IBeneficiary } from "../Interfaces";

interface IAddBeneficiaryProps {
  name: string;
  setName(name: string): void;
  surname: string;
  setSurname(surname: string): void;
  email: string;
  setEmail(email: string): void;
  addBeneficiary(): void;
  editBeneficiary: boolean;
  setError(msg: string): void;
  handleUpdateList(): void;
  setEditBeneficiary(editBeneficiary: boolean): void;
  setCurrentBeneficiary(currentBeneficiary: IBeneficiary): void;
  currentBeneficiary: IBeneficiary;
  error: string;
  beneficiaryList: Array<IBeneficiary>;
  handleDelete(id: string): void;
  handleBeneficiarySelect(beneficiary: IBeneficiary): void;
}

const AddBeneficiary: React.FunctionComponent<IAddBeneficiaryProps> = (
  props
) => {
  return (
    <div>
      {props.editBeneficiary && (
        <EditBeneficiary
          updateList={props.handleUpdateList}
          handleClose={() => props.setEditBeneficiary(!props.editBeneficiary)}
          handleEdit={(updatedBeneficiary) =>
            props.setCurrentBeneficiary(updatedBeneficiary)
          }
          currentBeneficiary={props.currentBeneficiary}
          beneficiaryList={props.beneficiaryList}
        />
      )}
      <h1>Add A Beneficiary</h1>
      <form>
        <div>
          {!!props.error && <p className="error">{props.error}</p>}
          <InputField
            id="beneficiary-name"
            label="Beneficiary Name"
            value={props.name}
            handleChange={(value) => props.setName(value)}
          />
        </div>
        <div>
          <InputField
            id="beneficiary-surname"
            label="Beneficiary Surname"
            value={props.surname}
            handleChange={(value) => props.setSurname(value)}
          />
        </div>
        <div>
          <InputField
            id="beneficiary-email"
            label="Beneficiary Email Address"
            value={props.email}
            handleChange={(value) => props.setEmail(value)}
          />
        </div>
        <Button callbackFn={props.addBeneficiary} text="Add Beneficiary" />
      </form>
      <div className="list">
        <h2>Beneficiaries</h2>
        {props.beneficiaryList.length > 0 ? (
          <div>
            <List
              handleDelete={(id) => props.handleDelete(id)}
              handleEdit={(beneficiary) =>
                props.handleBeneficiarySelect(beneficiary)
              }
              beneficiaries={props.beneficiaryList}
            />
          </div>
        ) : (
          <p>No Beneficiaries added</p>
        )}
      </div>
    </div>
  );
};

export default AddBeneficiary;
