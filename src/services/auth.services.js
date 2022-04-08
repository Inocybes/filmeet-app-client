import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`
})
// esta configuracion nos permite enviar el Token en cada request que se haga
service.interceptors.request.use((config) => {
  // aqui buscamos el token en localstorage
  const storedToken = localStorage.getItem("authToken")
  // si el toke existe lo agregamos a los headers del request
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` }
  // el condicional abajo hace lo mismo que arriba
  // if (storedToken) {
  //   config.headers = { Authorization: `Bearer ${storedToken}` }
  // }
  return config;
})

const signinService = (user) => {
  return service.post("/signin", user)
}

const loginService = (user) => {
  return service.post("/login", user)
}

const verifyService = () => {
  return service.get("/verify")
}

export {
  signinService,
  loginService,
  verifyService
}