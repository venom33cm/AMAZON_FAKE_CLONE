import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5001/clone-app-cf24b/us-central1/api",
});
export default instance;
