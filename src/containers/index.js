import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserList from "./UserList";
import User from "./User";

const Containers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/:pageNumber" element={<User />} />
      </Routes>
    </Router>
  );
};

export default Containers;
