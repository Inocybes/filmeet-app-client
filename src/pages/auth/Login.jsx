import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// import { loginService } from "../auth/Login";
// import { ThemeContext } from "../context/theme.context";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const { switchBtnTheme } = useContext(ThemeContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await loginService(user);
      const { authToken } = response.data;

      localStorage.setItem("authToken", authToken);

      // Redirect Home
      props.setIsLoggedIn(true);
      navigate("/");
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
      <h3>Log In</h3>

      
      <form onSubmit={handleSubmit}>
        <TextField
          id="filled-password-input"
          variant="filled"
          label="Email"
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

        <button>Submit</button>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
}

export default Login;
