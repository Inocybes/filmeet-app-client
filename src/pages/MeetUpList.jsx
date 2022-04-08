import MeetUp from "../components/MeetUp";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  meetUpListService,
} from "../services/meetUpList.services";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

function MeetUpList() {
 
  const [allMeetups, setAllMeetups] = useState(null);
  const navigate = useNavigate();
  const getAllMeetups = async () => {
    try {
      const response = await meetUpListService();
      setAllMeetups(response.data);
      navigate("/meet-up-list");
    } catch (err) {
      if (err.response.status === 401) {
      } else {
        navigate("/error");
      }
    }
  };
  
  useEffect(() => {
    getAllMeetups();
   
  }, []);
  if (!allMeetups) {
    return <h3>...Loading</h3>;
  }
  return (
    <div className="meetupListContainer">
      {/* Component */}
      <div>
        <MeetUp />
      </div>
      <div>
        <h1>MeetUp List</h1>
        {allMeetups.map((eachMeetup) => {
          return (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                alignItems: "center",
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="" />
                </ListItemAvatar>
                <ListItemText
                  primary={eachMeetup.title}
                  secondary={
                    <React.Fragment>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                      ></Stack>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {eachMeetup.creator?.username} <br />
                        {eachMeetup.city}:
                      </Typography>
                      {`  ${eachMeetup.description}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          );
        })}
      </div>
    </div>
  );
}
export default MeetUpList;