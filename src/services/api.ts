import axios from "axios";

export const baseUrlServer = "https://see-fleet.herokuapp.com/";
//export const baseUrlServer = "http://localhost:3333/";

const api = axios.create({
  baseURL: baseUrlServer,
});

export default api;
