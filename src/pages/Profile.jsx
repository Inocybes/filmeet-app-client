import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { myUserProfileService } from "../services/user.services";
import {
  meetUpListUserIdService,
  meetUpDeleteService,
} from "../services/meetUpList.services";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ProfileEdit from "../components/ProfileEdit";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function Profile() {
  const [userInfo, setUserInformation] = useState(null);
  const [meetUpList, setMeetUpList] = useState(null);
  const [somethingChanged, setSomethingChanged] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getInformation();
  }, [somethingChanged]);

  const getInformation = async () => {
    try {
      const response = await myUserProfileService();
      setUserInformation(response.data);
      const response2 = await meetUpListUserIdService();
      setMeetUpList(response2.data);
      // console.log(response2.data)
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    }
  };

  const handleDelete = async (meetUpId) => {
    try {
      await meetUpDeleteService(meetUpId);
      console.log(meetUpList);
      setSomethingChanged(!somethingChanged);
    } catch (error) {
      navigate("/error");
    }
  };

  if (!userInfo || !meetUpList) {
    return <h3>...Loading</h3>;
  }

  return (
    <div class="ProfileBox">
      <div>
        <h1>Profile</h1>
        <h3>Username:</h3>
        <p>{userInfo.username}</p>
        <h3>E-Mail:</h3>
        <p>{userInfo.email}</p>
        <h3>Nick:</h3>
        <p>{userInfo.nickName}</p>
        <h3>City:</h3>
        <p>{userInfo.city}</p>

        <ProfileEdit />
      </div>

      <div>
        <h2>Event List Created</h2>

        {meetUpList.map((eachMeetUp) => {
          return (
            <div key={eachMeetUp._id}>
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
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={eachMeetUp.title}
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
                          {eachMeetUp.description}
                          <IconButton
                            onClick={(e) => handleDelete(eachMeetUp._id)}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
