import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/meetup`,
});

// Needed for checking Authorization
service.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };

  return config;
});

const meetUpListService = () => {
  return service.get("/allMeetUp");
};

export const getMeetUpById = (id) =>{
  return service.get(`/getmeetupbyid/${id}`)
}

const meetUpListUserIdService = () =>{
  return service.get("/meetUpList")
}

const meetUpFormService = (newMeetUp) => {
  return service.post("/newMeetUp", newMeetUp);
};

const meetUpEditService = (_id, updatedMeetUp) => {
  return service.patch(`/meetUpList/${_id}`, updatedMeetUp);
};

const meetUpDeleteService = (data) => {
  return service.delete("/meetUpList", {data: {data}});
};

export {
  meetUpListService,
  meetUpFormService,
  meetUpEditService,
  meetUpDeleteService,
  meetUpListUserIdService
};
