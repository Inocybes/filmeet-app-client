import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editUserProfileService,
  myUserProfileService,
  deleteUserService,
} from "../services/user.services";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Next } from "react-bootstrap/esm/PageItem";

function ProfileEdit() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [nickName, setNickName] = useState("");

  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id)

  const handleUserName = (e) => setUserName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleNickName = (e) => setNickName(e.target.value);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await myUserProfileService();
      setUserName(response.data.username);
      setEmail(response.data.email);
      setCity(response.data.city);
      setNickName(response.data.nickName);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = { username, email, nickName, city };
      editUserProfileService(updatedProfile);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserService(id);
      navigate("/signin");
    } catch (error) {
      navigate("/error");
    }
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Button
        id="buttonEditProf"
        onClick={handleShowForm}
        variant="contained"
        disableElevation
      >
        Edit Profile
      </Button>
      {/* <Button
        id="buttonDeleteProf"
        onClick={handleDelete}
        variant="danger"
      >
        
      </Button> */}
      <Button onClick={handleDelete} variant="outline-danger">
        Delete Profile
      </Button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <br />
          <TextField
            id="filled-password-input"
            variant="filled"
            label="Username"
            type="text"
            value={username}
            autoComplete="current-description"
            size="small"
            onChange={handleUserName}
          />

          <br />
          <br />

          <TextField
            id="filled-password-input"
            variant="filled"
            label="E-mail"
            type="text"
            value={email}
            autoComplete="current-description"
            size="small"
            onChange={handleEmail}
          />

          <br />
          <br />

          <TextField
            id="filled-password-input"
            variant="filled"
            label="City"
            type="text"
            value={city}
            autoComplete="current-description"
            size="small"
            onChange={handleCity}
          />
          <br />
          <br />

          <TextField
            id="filled-password-input"
            variant="filled"
            label="Nick"
            type="text"
            value={nickName}
            autoComplete="current-description"
            size="small"
            onChange={handleNickName}
          />

          <br />
          <br />

          <button>Submit</button>
        </form>
      )}
    </div>
  );
}

export default ProfileEdit;
