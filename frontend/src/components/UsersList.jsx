import { useEffect, useState } from "react";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const result = await res.json();
    setUsers(result);
  };

  const handleAddClick = () => {
    navigate("/add-user");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card w-2/3 shadow-xl flex">
        <div className="card-body">
          <div className="flex justify-between">
            <button className="btn btn-primary" onClick={handleBack}>
              Back to Home
            </button>
            <h2 className="text-3xl font-serif">List of Users</h2>
            <button className="btn btn-primary" onClick={handleAddClick}>
              Add New User
            </button>
          </div>
        </div>
        {users?.length>0 ? <Table users={users} /> : <h1 className="text-3xl items-center">Add new users to populate the table</h1>}
      </div>
    </div>
  );
};

export default UsersList;
