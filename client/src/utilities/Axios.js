import Axios from "axios";
import { API } from "./KEYS.json";
export default Axios.create({
  baseURL: API + "/api",
  withCredentials: true,
});
