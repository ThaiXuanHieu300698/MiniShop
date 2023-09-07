import axios from "axios";
import Cookies from "universal-cookie";
import { BASE_URL } from "../utils/constants";

const cookies = new Cookies();

class AuthService {
  loginAsync = async (model) => {
    let response;
    await axios
      .post(BASE_URL + "/api/Users/login", model)
      .then((res) => {
        response = res;
        this.setUserCookie({
          user: res.data.user,
          token: res.data.token,
        });
      })
      .catch((error) => {
        if (error.response) {
          response = error.response;
        }
      });
    return response;
  };

  logout = () => {
    this.removeUserCookie();
  };

  setUserCookie = async (user) => {
    cookies.set("user", user, { path: "/" });
  };

  removeUserCookie = () => {
    cookies.remove("user");
  };
}

export default new AuthService();
