import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const { pageNumber } = useParams();

  useEffect(() => {
    fetchUsers(pageNumber).then((res) => {
      if (!!res) {
        setUsers([...users, ...res]);
      }
    });
  }, [pageNumber]);

  const fetchUsers = async (pageNumber) => {
    const response = await fetch(
      `https://api.github.com/orgs/mozilla/members?page=${pageNumber}`
    );
    const data = await response.json();

    return data;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {users.map((user, index) => {
        return (
          <div style={{ margin: 20 }}>
            <div key={user.id}>{user.login}</div>
          </div>
        );
      })}
    </div>
  );
};

export default User;
