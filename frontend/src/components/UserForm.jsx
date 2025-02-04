import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserForm = ({
  initialData = null,
  onSubmit,
  onDelete,
  isEditModeProp = false,
}) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    mobile: "",
    interest: [],
    ...initialData,
  });
  const [interestInput, setInterestInput] = useState("");
  const [isEditMode, setIsEditMode] = useState(isEditModeProp);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setIsEditMode(isEditModeProp);
  }, [isEditModeProp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: name === "age" || name === "mobile" ? Number(value) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddInterest = (e) => {
    if (
      e.key === "Enter" &&
      interestInput.trim() !== "" &&
      !user.interest.includes(interestInput.trim())
    ) {
      setUser((prev) => ({
        ...prev,
        interest: [...prev.interest, interestInput.trim()],
      }));
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setUser((prev) => ({
      ...prev,
      interest: prev.interest.filter(
        (interest) => interest !== interestToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(user);
      setIsEditMode(false);
    }
  };

  const handleBack = () => {
    navigate("/users-list");
  };

  const handleInterestChange = (e) => {
    const {name, value} = e.target
    setInterestInput(value)
    if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
  }

  const validate = () => {
    let newErrors = {};

    if (!user.firstName.trim()) newErrors.firstName = "First name is required";
    if (!user.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!user.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(user.age) || user.age <= 17 || user.age>100) {
      newErrors.age = "Enter a valid age";
    }
    if (!user.mobile) {
      newErrors.mobile = "Phone number is required";
    } else if (!/^\d{10}$/.test(user.mobile)) {
      newErrors.mobile = "Phone number must be 10 digits";
    }
    if(user.interest.length<1){
        newErrors.interest = "Atleast one Interest is required"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex justify-center item">
      <div className="flex justify-center item my-20 mr-20">
        <div className="card bg-[#bb6d6d] w-96 shadow-xl">
          <div className="card-body bg-slate-800">
            <div className="flex justify-between">
              <h2 className="card-title justify-center">
                {initialData?._id ? "User Details" : "Add User"}
              </h2>
              {initialData?._id && (
                <>
                  <button
                    className="btn btn-xs btn-accent"
                    onClick={() => setIsEditMode(false)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => onDelete(user._id)}
                  >
                    Delete
                  </button>
                </>
              )}
              <button className="btn btn-primary btn-sm" onClick={handleBack}>
                Back to Home
              </button>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              First Name
              <input
                type="text"
                name="firstName"
                className="grow"
                value={user.firstName}
                onChange={handleChange}
                readOnly={isEditMode}
              />
            </label>
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName}</p>
            )}
            <label className="input input-bordered flex items-center gap-2">
              Last Name
              <input
                type="text"
                name="lastName"
                className="grow"
                value={user.lastName}
                onChange={handleChange}
                readOnly={isEditMode}
              />
            </label>
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName}</p>
            )}
            <label className="input input-bordered flex items-center gap-2">
              Age
              <input
                type="number"
                name="age"
                className="grow"
                value={user.age}
                onChange={handleChange}
                readOnly={isEditMode}
              />
            </label>
            {errors.age && <p className="text-red-500">{errors.age}</p>}
            <label className="input input-bordered flex items-center gap-2">
              Email ID
              <input
                type="text"
                name="email"
                className="grow"
                value={user.email}
                onChange={handleChange}
                readOnly={isEditMode}
              />
            </label>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <label className="input input-bordered flex items-center gap-2">
              Contact No.
              <input
                type="number"
                name="mobile"
                className="grow"
                value={user.mobile}
                onChange={handleChange}
                readOnly={isEditMode}
              />
            </label>
            {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
            {!isEditMode && (
              <div className="flex justify-between">
                <label className="input input-bordered flex items-center gap-2 h-auto">
                  Press Enter to add Interests
                  <input
                    type="text"
                    className="grow"
                    name="interest"
                    value={interestInput}
                    onChange={handleInterestChange}
                    onKeyDown={handleAddInterest}
                  />
                </label>
              </div>
            )}
            {user.interest && (
              <div className="flex flex-wrap gap-2">
                {user.interest.map((interest, index) => (
                  <div
                    key={index}
                    className="badge badge-primary cursor-pointer"
                  >
                    {interest}
                    {!isEditMode && (
                      <span
                        className="ml-2 text-sm text-red-600"
                        onClick={() => handleRemoveInterest(interest)}
                      >
                        ❌
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            {errors.interest && <p className="text-red-500">{errors.interest}</p>}
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSubmit}>
                {isEditMode ? "Save Changes" : "Add User"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
