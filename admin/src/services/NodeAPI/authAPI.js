import axios from "axios";
import { accessToken, refreshToken } from "../../constant/constant";
import Cookies from "js-cookie";
const authAPI = {
    login: async (email,password) => {
        try {
            let result = null;
            let status = null;
            const api = import.meta.env.VITE_API_URL;
            await axios.post(`${api}/auth/login/admin`,{data: {email: email,pass: password}})
            .then((res) => {
                
                console.log(res);
                result = res.data;
                status = res.status;
            })
            .catch((err) => {
                console.log(err);
                status = err.response.status;
            })

            if(result) {
                let accessToken1 = result.accessToken;
                let refreshToken1 = result.refreshToken;
                Cookies.set(accessToken,accessToken1);
                Cookies.set(refreshToken,refreshToken1);
                return status;
            }
            return status;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}


export default authAPI;