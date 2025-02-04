import { useNavigate } from "react-router-dom";

const Table = ({ users }) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr
                className="hover cursor-pointer"
                key={user._id}
                onClick={() => navigate(`/user-details/${user._id}`)}
              >
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
