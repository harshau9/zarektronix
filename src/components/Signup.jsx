import React, { useEffect, useState } from 'react';
import { FaCat } from "react-icons/fa";



function Signup({onRegistration}) {

  const handleSignup = (event) => {
    event.preventDefault();

    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    if (navigator.onLine) {
      registerUsers(formData);
    } else {
      saveLocally(formData);
    }
  };
  const registerUsers = async (usersData) => {
    try {
      if (Array.isArray(usersData)) {
        const promises = usersData.map(async (user) => {
          const response = await fetch("https://puzzled-clothes-ox.cyclic.app/users/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "content-type": "application/json"
            }
          });
  
          const data = await response.json();
          console.log('Online: Sending data to the server:', user);
          return data;
        });
  
        await Promise.all(promises);
        removeLocally();
      } else {
      
          const response = await fetch("https://puzzled-clothes-ox.cyclic.app/users/register", {
            method: "POST",
            body: JSON.stringify(usersData),
            headers: {
              "content-type": "application/json"
            }
          })
          alert("Registration Done Successfully");
          if (!response.ok) {
            throw new Error(`Registration failed with status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          
      }
      onRegistration();
    } catch (err) {
      console.error("Error:", err.message);
      // alert("Registration Not Successfull, user already registered");
    }
  };
  

  const saveLocally = (formData) => {
    const storedUsers = localStorage.getItem('users');
    const usersArray = storedUsers ? JSON.parse(storedUsers) : [];
    usersArray.push(formData);
    localStorage.setItem('users', JSON.stringify(usersArray));
    console.log('Offline: User data saved locally:', formData);
  }

  const removeLocally = () => {
    localStorage.removeItem('users');
  };

  const arr = localStorage.getItem('users');

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (navigator.onLine && storedUsers) {
      const usersData = JSON.parse(storedUsers);
      registerUsers(usersData);
      
    }
  }, [navigator.onLine, arr]);

  return (
    <div className="signup">
      <h1>Schrodinger's Signup <FaCat /></h1>
      <form onSubmit={handleSignup}>
        <input type="text" name="name" required placeholder="Enter Username"/>
        <input type="email" name="email" required placeholder="Enter Email"/>
        <input type="password" name="password" required placeholder="Enter Password"/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup