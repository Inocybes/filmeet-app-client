import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/user`
})

service.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };
  return config;
});

// const userProfileService = (id) => {
//   return service.post("/:id", id)
// }

// const userProfileEditService = (id) => {
//   return service.post("/:id/edit", id)
// }

const myUserProfileService = () =>{
  return service.get("/")
}

const deleteUserService = () =>{
  return service.delete("/delete")
}

const editUserProfileService = (updatedProfile) =>{
  return service.patch("/edit", updatedProfile)
}

export {
  myUserProfileService,
  // userProfileService,
  // userProfileEditService,
  deleteUserService,
  editUserProfileService
}