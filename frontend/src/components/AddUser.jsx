import { useState } from "react";
import { validateInputData } from "../utils/validation";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [interest, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState("");
  const navigate = useNavigate();

  const handleInterestSubmit = (e) => {
    console.log(interestInput);
    if (
      e.key === "Enter" &&
      interestInput.trim() !== "" &&
      !interest.includes(interestInput.trim())
    ) {
      setInterests([...interest, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setInterests(interest.filter((interest) => interest !== interestToRemove));
  };

  const handleSubmit = async() => {
    const newUser = {
      firstName,
      lastName,
      age,
      email,
      interest,
      mobile,
    };
    try {
      if (!validateInputData(newUser)) {
        throw new Error('Data Invalid')
      }
      const res = await fetch("http://localhost:5000/user", {
        method: 'POST',
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      console.log(data);
      navigate('/users-list')
      
    } catch (error) {
      alert("Something went wrong when adding the user", error.message)
    }
  };

  const handleBack = () => {
    navigate("/users-list");
  };

  return (
    <div className="flex justify-center item">
      <div className="flex justify-center item my-20 mr-20">
        <div className="card bg-[#bb6d6d] w-96 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between">
            <h2 className="card-title text-[#271313] justify-center">
              Add New User
            </h2>
            <button className="btn btn-primary btn-sm" onClick={handleBack}>
              Back to Home
            </button>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              First Name
              <input
                type="text"
                className="grow"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Last Name
              <input
                type="text"
                className="grow"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Age
              <input
                type="number"
                className="grow"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Email ID
              <input
                type="text"
                className="grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Contact No.
              <input
                type="number"
                className="grow"
                value={mobile}
                onChange={(e) => setMobile(Number(e.target.value))}
              />
            </label>
            <div className="flex justify-between">
              <label className="input input-bordered flex items-center gap-2 h-auto">
                Press Enter to add Interests
                <input
                  type="text"
                  className="grow"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={handleInterestSubmit}
                />
              </label>
            </div>
            {interest && (
              <div className="flex flex-wrap gap-2">
                {/* Display Interests as Badges */}
                {interest.map((interest, index) => (
                  <div
                    key={index}
                    className="badge badge-primary cursor-pointer"
                  >
                    {interest}
                    <span
                      className="ml-2 text-sm text-red-600"
                      onClick={() => handleRemoveInterest(interest)}
                    >
                      ❌
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Add User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
