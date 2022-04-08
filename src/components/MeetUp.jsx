import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  meetUpFormService,
  meetUpListService,
} from "../services/meetUpList.services";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function MeetUp(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [movie, setMovie] = useState("");
  const [type, setType] = useState("");
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleMovie = (e) => setMovie(e.target.value);
  const handleType = (e) => setType(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMeetUp = { title, description, city, movie, type };

    try {
      await meetUpFormService(newMeetUp);
      
      meetUpListService();
      setTitle("");
      setDescription("");
      setCity("");
      setMovie("");
      setType("");
     
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
        id="buttonMeetUp"
        onClick={handleShowForm}
        variant="contained"
        disableElevation
      >
        New MeetUp
      </Button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <br />
          <TextField
            id="filled-password-input"
            variant="filled"
            label="Title"
            type="text"
            value={title}
            autoComplete="disable"
            size="small"
            onChange={handleTitle}
          />

          <br />
          <br />

          <TextField
            id="filled-password-input"
            variant="filled"
            label="Description"
            type="text"
            value={description}
            autoComplete="current-description"
            size="small"
            onChange={handleDescription}
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
            label="Movie"
            type="text"
            value={movie}
            autoComplete="current-description"
            size="small"
            onChange={handleMovie}
          />
          <br />
          <br />
        
          <TextField
            id="filled-password-input"
            variant="filled"
            label="Type"
            type="text"
            value={type}
            autoComplete="current-description"
            size="small"
            onChange={handleType}
          /> 

          <br />
          <br />

          <button>Add Meet Up</button>
        </form>
      )}
    </div>
  );
}

export default MeetUp;
