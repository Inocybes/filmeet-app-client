import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinService } from "../../services/auth.services";
import TextField from "@mui/material/TextField";

function Signin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [nickName, setNickName] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username, email, password, nickName, city };
    // Send User to backend for register creating.
    try {
      await signinService(user);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h3>Sign In</h3>

      <form onSubmit={handleSubmit}>
        <TextField
          id="filled-password-input"
          variant="filled"
          label="Username"
          type="text"
          value={username}
          autoComplete="disable"
          size="small"
          onChange={(e) => setUsername(e.target.value)}
          margin="dense"
        />

        <br />

        <TextField
          id="filled-password-input"
          variant="filled"
          label="email"
          type="text"
          value={email}
          autoComplete="disable"
          size="small"
          onChange={(e) => setEmail(e.target.value)}
          margin="dense"
        />

        <br />

        <TextField
          id="filled-password-input"
          variant="filled"
          label="Password"
          type="password"
          value={password}
          autoComplete="disable"
          size="small"
          onChange={(e) => setPassword(e.target.value)}
          margin="dense"
        />

        <br />

        <TextField
          id="filled-password-input"
          variant="filled"
          label="Nick"
          type="text"
          value={nickName}
          autoComplete="disable"
          size="small"
          onChange={(e) => setNickName(e.target.value)}
          margin="dense"
        />

        <br />

        <TextField
          id="filled-password-input"
          variant="filled"
          label="City"
          type="text"
          value={city}
          autoComplete="disable"
          size="small"
          onChange={(e) => setCity(e.target.value)}
          margin="dense"
        />

        <br />

        <button>Submit</button>
      </form>

      <p>{errorMessage}</p>
    </div>
  );
}

export default Signin;
