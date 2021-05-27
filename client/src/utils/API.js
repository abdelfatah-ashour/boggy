import Axios from "axios";

export default Axios.create({
	baseURL: "https://boggy-backend.herokuapp.com/api",
	withCredentials: true,
});
