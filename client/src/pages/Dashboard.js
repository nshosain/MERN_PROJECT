import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  // gets user information from backend
  async function getUserInfo() {
    const response = await fetch("http://localhost:1337/api/userdata", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    // convert api data to JSON
    const data = await response.json();
    // check if data contains user's name
    if (data.status === "ok") {
      console.log(name);
      // if there is a name, set it to state variable name
      setName(data.name);
    } else {
      // if no name found in data, alert user
      alert(data.error);
    }
  }

  // check if user is loggedin
  useEffect(() => {
    // get token from browser localstorage
    const token = localStorage.getItem("token");
    if (token) {
      // get's the payload by decoding jwt token
      const user = jwtDecode(token);

      // if user does not exist, redirect to login
      // remove the token from browser localstorage
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        // if user exists! Get information from backend
        getUserInfo();
      }
    } else {
      // if there are no tokens
      // redirect to login page
      alert("You must Login first!");
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <h1>Welcome {name}!</h1>
      <h4>
        Checkout the Git Repo
        <a href="https://github.com/nshosain/MERN_PROJECT"> here!</a>
      </h4>
    </div>
  );
};

export default Dashboard;
