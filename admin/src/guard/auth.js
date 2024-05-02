import { accessToken } from "../constant/constant";
import Cookies from "js-cookie";

export const isLogined = () => {
    const getAccessToken = Cookies.get(accessToken);
    if (getAccessToken) {
      return true;
    }else{
      console.log("not access token");
      // const currentPath = window.location.pathname + window.location.search;
      const redirectUrl = `/login`;

      window.location.href = redirectUrl;
      return false;
    }
}