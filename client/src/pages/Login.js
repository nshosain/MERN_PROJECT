import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // convert server response to JSON
    const data = await response.json();

    //if user exists
    if (data.user) {
      // keeping jwt token in browser storage
      localStorage.setItem("token", data.user);
      alert("Login Successful!");
      // redirect to dashboard page
      window.location.href = "/dashboard";
    } else {
      // for unsuccessful login attempt
      alert("Please Check the Login Credentials!");
    }
    console.log(data);
  }

  //returns a login form
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
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
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
