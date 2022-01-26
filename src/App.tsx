import { useState } from "react";
import { IBeneficiary } from "./Interfaces";
import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AddBeneficiary from "./components/AddBeneficiary";
import SuccessScreen from "./components/SuccessScreen";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const [editBeneficiary, setEditBeneficiary] = useState(false);
  const [currentBeneficiary, setCurrentBeneficiary] = useState<IBeneficiary>({
    name: "",
    surname: "",
    email: "",
    id: "",
  });
  const [error, setError] = useState("");
  const [beneficiaryList, setBeneficiaryList] = useState<Array<IBeneficiary>>(
    []
  );

  const validationChecks = (): boolean => {
    // Check if max limit of 5 beneficiaries has been reached
    if (beneficiaryList.length === 5) {
      setError("Maximum of 5 Beneficiaries added");
      return false;
    }
    // Check if all fields have been completed
    if (name === "" || surname === "" || email === "") {
      setError("Please make you have entered a Name Surname and Email");
      return false;
    }

    const validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!validEmailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Check if email is unique
    const unique = beneficiaryList.findIndex((item) => item.email === email);

    if (unique > -1) {
      setError("Please enter a unique email address");
      return false;
    }

    return true;
  };

  const addBeneficiary = () => {
    const validation = validationChecks();
    if (!validation) {
      return;
    }
    // Create new beneficiary
    const beneficiary = {
      name,
      surname,
      email,
      id: uuidv4(),
    };
    // Add New Beneficiary to List
    setBeneficiaryList([...beneficiaryList, beneficiary]);
    // Clear Inputs
    clearInputs();
  };

  const clearInputs = (): void => {
    setName("");
    setSurname("");
    setEmail("");
    setError("");
  };

  const handleBeneficiarySelect = (beneficiary: IBeneficiary): void => {
    // Show edit Beneficiary Modal
    setEditBeneficiary(true);
    // Set the Current Selected Beneficiary
    setCurrentBeneficiary(beneficiary);
  };

  const handleDelete = (id: string): void => {
    const findIndex = beneficiaryList.findIndex((item) => item.id === id);
    // if beneficiary found
    if (findIndex > -1) {
      const newList = [...beneficiaryList];
      newList.splice(findIndex, 1);
      setBeneficiaryList(newList);
    }
  };

  const handleUpdateList = () => {
    const findIndex = beneficiaryList.findIndex(
      (item) => item.id === currentBeneficiary.id
    );
    // if beneficiary found
    if (findIndex > -1) {
      const newList = [...beneficiaryList];
      newList[findIndex] = currentBeneficiary;
      setBeneficiaryList(newList);

      // close modal
      setEditBeneficiary(false);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <AddBeneficiary
              name={name}
              surname={surname}
              setSurname={(surname) => setSurname(surname)}
              setName={(name) => setName(name)}
              email={email}
              setEmail={(email) => setEmail(email)}
              addBeneficiary={addBeneficiary}
              editBeneficiary={editBeneficiary}
              setError={setError}
              handleUpdateList={handleUpdateList}
              setEditBeneficiary={(value) => setEditBeneficiary(value)}
              setCurrentBeneficiary={(currentBeneficiary) =>
                setCurrentBeneficiary(currentBeneficiary)
              }
              currentBeneficiary={currentBeneficiary}
              error={error}
              beneficiaryList={beneficiaryList}
              handleDelete={handleDelete}
              handleBeneficiarySelect={handleBeneficiarySelect}
            />
          }
        />
        <Route
          path="success"
          element={<SuccessScreen beneficiaryList={beneficiaryList} />}
        />
      </Routes>
      <div className="footer">
        <NavLink className="button" to="/">
          Back
        </NavLink>
        <NavLink
          className="button"
          to={beneficiaryList.length > 0 ? "success" : "#"}
        >
          Submit
        </NavLink>
      </div>
    </div>
  );
}

export default App;
