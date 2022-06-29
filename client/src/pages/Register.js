import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function isInputValid() {
    if (name === "" || email === "" || password === "") {
      alert("Fields Can not be empty!");
      return false;
    } else {
      return true;
    }
  }

  async function registerUser(event) {
    event.preventDefault();
    if (isInputValid()) {
      const response = await fetch("http://localhost:1337/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      // if registration is successful
      //  navigate to login page
      if (data.status === "ok") {
        alert("Registration Successful!");
        navigate("/login");
      }
      console.log(data);
    }
  }

  //returns a registraion form
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          pattern=".{4,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        />
        <br />
        <input type="submit" value="Register" />
      </form>
      <div>
        <p>
          Already a member? <a href="/login"> Sign In!</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
