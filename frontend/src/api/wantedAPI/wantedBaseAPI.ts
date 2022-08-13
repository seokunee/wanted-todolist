import axios from "axios";

const wantedAPI = axios.create({
  baseURL: "http://localhost:8080",
});
export default wantedAPI;
