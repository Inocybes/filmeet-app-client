import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/auth/Login";
import Signin from "./pages/auth/Signin";

import Home from "./pages/Home";
import MeetUpList from "./pages/MeetUpList";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/Profile";
import ProfileEdit from "./components/ProfileEdit";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";

import { useEffect, useState, useContext } from "react";
import { verifyService } from "./services/auth.services";

// import { ThemeContext } from ".react"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    verifyUser();
  }, []);

  //Verify User  --- _id user logged from backend --- auth.routes
  const verifyUser = async () => {
    try {
      await verifyService();

      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/movie-details" element={<MovieDetails />} />
        <Route path="/profile/" element={<Profile />} />
        {/* <Route path="/profile/:id/edit" element={<ProfileEdit />} /> */}
        <Route path="/meet-up-list" element={<MeetUpList />} />

        <Route path="/signin" element={<Signin />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
