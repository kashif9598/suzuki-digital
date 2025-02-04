import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateInputData } from "../utils/validation";

const UserDetails = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails(id);
  }, [id]);

  const fetchUserDetails = async (id) => {
    const res = await fetch(`http://localhost:5000/user/${id}`);
    const result = await res.json();
    setUserDetail(result);
  };

  const handleInterestInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddInterest = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!userDetail?.interest.includes(inputValue.trim())) {
        setUserDetail({
          ...userDetail,
          interest: [...userDetail.interest, inputValue.trim()],
        });
      }
      setInputValue("");
    }
  };

  const removeInterest = (interest) => {
    setUserDetail({
      ...userDetail,
      interest: userDetail.interest.filter((item) => item !== interest),
    });
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleChange = (e, field) => {
    let value = e.target.value;
    if (field === "age" || field === "mobile") {
      value = value ? parseInt(value, 10) : "";
    }
    setUserDetail({ ...userDetail, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!validateInputData(userDetail)) {
        throw new Error("Invalid data");
      }
      await fetch(`http://localhost:5000/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetail),
      });
      navigate("/users-list");
    } catch (error) {
      alert("Something went wrong when editing the user", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );

      if (!confirmDelete) return;
      await fetch(`http://localhost:5000/user/${id}`, {
        method: "DELETE",
      });
      navigate("/users-list");
    } catch (error) {
      alert("Something went wrong when deleting the user", error.message);
    }
  };

  const handleBack = () => {
    navigate("/users-list");
  };
  return (
    <div className="flex justify-center item">
      <div className="flex justify-center item my-20 mr-20">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between gap-2">
              <h2 className="card-title text-2xl">User Details</h2>
              <button className="btn btn-xs btn-accent" onClick={handleEdit}>
                Edit
              </button>
              <button className="btn btn-xs btn-error" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn btn-primary btn-xs" onClick={handleBack}>
                Back to Home
              </button>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              First Name
              <input
                type="text"
                className="grow"
                required
                value={userDetail?.firstName || ""}
                disabled={!isEdit}
                onChange={(e) => handleChange(e, "firstName")}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Last Name
              <input
                type="text"
                className="grow"
                required
                value={userDetail?.lastName || ""}
                disabled={!isEdit}
                onChange={(e) => handleChange(e, "lastName")}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Age
              <input
                type="number"
                className="grow"
                required
                value={userDetail?.age ?? ""}
                disabled={!isEdit}
                onChange={(e) => handleChange(e, "age")}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Email ID
              <input
                type="text"
                className="grow"
                required
                value={userDetail?.email || ""}
                disabled={!isEdit}
                onChange={(e) => handleChange(e, "email")}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Contact no.
              <input
                type="number"
                className="grow"
                required
                value={userDetail?.mobile ?? ""}
                disabled={!isEdit}
                onChange={(e) => handleChange(e, "mobile")}
              />
            </label>
            {isEdit && (
              <input
                type="text"
                required
                className="input input-bordered w-full mt-2"
                placeholder="Add interest and press Enter"
                value={inputValue}
                onChange={handleInterestInput}
                onKeyDown={handleAddInterest}
              />
            )}
            <label>Interests</label>
            <div className="flex flex-wrap gap-2">
              {userDetail?.interest.map((interest, index) => (
                <span
                  key={index}
                  className="badge badge-primary cursor-pointer"
                  onClick={() => removeInterest(interest)}
                >
                  {interest}{" "}
                  {isEdit && (
                    <span
                      className="ml-1 text-red-500"
                      onClick={() => removeInterest(interest)}
                    >
                      ❌
                    </span>
                  )}
                </span>
              ))}
            </div>
            {isEdit && (
              <button
                className="btn btn-primary mt-4 w-full"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
