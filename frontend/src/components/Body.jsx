import { useNavigate } from "react-router-dom";

const Body = () => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/users-list");
    };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">User Management</h1>
          <p className="py-6">
            Click the button to view, add or delete the users from the list.
          </p>
          <button className="btn btn-primary" onClick={handleClick}>Click to enter</button>
        </div>
      </div>
    </div>
  );
};

export default Body;
