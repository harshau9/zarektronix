import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

function UsersList({usersUpdated}) {
  const [users, setUsers] = useState([]);
  // const navigate = useNavigate();
  useEffect(() => {
    fetch("https://puzzled-clothes-ox.cyclic.app/users")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUsers(res);
      })
      .catch((err) => console.log(err));
  }, [usersUpdated]);
  return (
    <div className="table-cont">
      <h1>Users List</h1>
      {users ? (
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
