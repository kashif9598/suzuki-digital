import { validateInputData } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

const AddUser = () => {
  const navigate = useNavigate();

  const handleSubmit = async (newUser) => {
    try {
      if (!validateInputData(newUser)) {
        throw new Error("Data Invalid");
      }
      const res = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || "Something went wrong when adding the user"
        );
      }
      navigate("/users-list");
    } catch (error) {
      alert(error.message);
    }
  };

  return <UserForm onSubmit={handleSubmit} isEditModeProp={false} />;
};

export default AddUser;
