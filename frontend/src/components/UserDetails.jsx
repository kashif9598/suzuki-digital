import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateInputData } from "../utils/validation";
import UserForm from "./UserForm";

const UserDetails = () => {
  const [userDetail, setUserDetail] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async (id) => {
      const res = await fetch(`http://localhost:5000/user/${id}`);
      const result = await res.json();
      setUserDetail(result);
    };

    fetchUserDetails(id);
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      if (!validateInputData(updatedData)) {
        throw new Error("Invalid data");
      }
      await fetch(`http://localhost:5000/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
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

  return userDetail ? (
    <UserForm
      initialData={userDetail}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      isEditModeProp={false}
    />
  ) : (
    <p>Loading...</p>
  );
};

export default UserDetails;
