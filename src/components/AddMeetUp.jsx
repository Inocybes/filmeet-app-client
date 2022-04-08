import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function AddMeetUp(props) {
  
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [movie, setMovie] = useState("");
  const [description, setDescription] = useState("");
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const user = { username, email, password, nickName, city }
  //   // enviar usuario al backend para crear el registro
  //   try {
  //     await signinService(user)
  //     navigate("/login")
  //   } catch(err) {
  //     // if (err?.response?.status === 400) {
  //     if (err.response && err.response.status === 400) {
  //       setErrorMessage(err.response.data.errorMessage)
  //     } else {
  //       navigate("/error")
  //     }
  //   }

  // }
    
  
  // return (
  //   <div>
    
  //   <form onSubmit={handleSubmit}>
  //       <label htmlFor="title">Title:</label>
  //       <input
  //         type="text"
  //         name="title"
  //         value={title}
  //         onChange={(e) => setTitle(e.target.value)}
  //       />
        
  //       <br />

  //       <label htmlFor="city">City:</label>
  //       <input
  //         type="text"
  //         name="city"
  //         value={city}
  //         onChange={(e) => setCity(e.target.value)}
  //       />

  //       <br />
  //       <label htmlFor="movie">Movie:</label>
  //       <input
  //         type="text"
  //         name="movie"
  //         value={movie}
  //         onChange={(e) => setMovie(e.target.value)}
  //       />

  //       <br />
  //       <label htmlFor="description">Description:</label>
  //       <TextField
  //         id="outlined-textarea"
  //         label="Multiline Placeholder"
  //         placeholder="Placeholder"
  //         multiline
  //         name="description"
  //         maxRows={4}
  //         value={description}
  //         onChange={(e) => setDescription(e.target.value)}
  //       />
             
  //       <br />

  //       {/* <button style={{...btnStyles, ...switchBtnTheme()}}>Submit</button> */}
  //       <button>Submit</button>
  //       {/* style={switchBtnTheme()} */}
  //     </form>


    
  //   </div>
  // )
}

export default AddMeetUp