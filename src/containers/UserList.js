import { useEffect, useRef, useState, useCallback } from "react";
import { parseLinkHeader } from "../helpers/parseLink";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  const lastUserElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    setLoading(true);
    fetchUsers(pageNumber)
      .then((res) => {
        if (!!res) {
          setUsers([...users, ...res]);
        }
      })
      .finally(() => setLoading(false));
  }, [pageNumber]);

  const fetchUsers = async (pageNumber) => {
    if (pageNumber <= lastPage || pageNumber === 1) {
      const response = await fetch(
        `https://api.github.com/orgs/mozilla/members?page=${pageNumber}`
      );
      const responeHeaders = await response.headers.get("link");
      const data = await response.json();
      console.log(parseLinkHeader(responeHeaders));
      if (parseLinkHeader(responeHeaders)?.last?.page) {
        setLastPage(parseLinkHeader(responeHeaders)?.last?.page);
      }
      return data;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {users.map((user, index) => {
        return (
          <div style={{ margin: 20 }}>
            {index === users.length - 1 ? (
              <div ref={lastUserElementRef} key={user.id}>
                {user.login}
              </div>
            ) : (
              <div key={user.id}>{user.login}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
