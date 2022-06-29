import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  // checks if any of the input fields are empty
  function isInputValid() {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      image === "" ||
      phone === ""
    ) {
      alert("Fields Can not be empty!");
      return false;
    } else {
      return true;
    }
  }

  // helper function for image uploading
  const uploadImage = async (e) => {
    // getting image from event
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  // helper functon that converts file to base64 string
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function registerUser(event) {
    event.preventDefault();

    //if input fields are valid, proceed
    if (isInputValid()) {
      const response = await fetch("http://localhost:1337/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          password,
          image,
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
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          placeholder="Phone"
          pattern="[0-9]{11}"
          title="Must contain a valid Phone Number of 11 digits"
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
          title="Must contain at least 4 or more characters"
        />
        <br />
        <input
          type="file"
          style={{ width: "170px", overflow: "hidden" }}
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        <br />
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
