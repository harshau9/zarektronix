import React, { useState, useEffect } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
// import { useNavigate } from "react-router-dom";

function UsersList({ usersUpdated }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    fetch("https://puzzled-clothes-ox.cyclic.app/users")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setLoading(false);
        setUsers(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [usersUpdated]);

  return (
    <div className="table-cont">
      <h1>Users List</h1>
      {loading ? (
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      ) : users ? (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((ele, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No Users</h1>
      )}
    </div>
  );
}

export default UsersList;
