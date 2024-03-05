import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import UsersList from "./components/UsersList";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const [usersUpdated, setUsersUpdated] = useState(false);
  const onRegistration = () => {
    setUsersUpdated(true);
  };
  return (
    <div className="App">
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Signup onRegistration={onRegistration} />}
          ></Route>
          <Route
            path="/users"
            element={<UsersList usersUpdated={usersUpdated} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
