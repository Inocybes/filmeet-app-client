import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/movie`
})


const ProfileService = (id) => {
  return service.get(`/${id}`)
}
const editProfileService = (id) => {
  return service.get(`/${id}`)
}




export {
  ProfileService,
  editProfileService,
} 