import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import UsersList from "./components/UsersList";
import UserDetails from "./components/UserDetails";
import AddUser from "./components/AddUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/user-details/:id" element={<UserDetails />} />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
