import axios from '../../config/axiosBaseUrl/axios'


const UserAPI = {
    getProfile: async () => {
        try {
            let result = null;
            await axios.get('/get-user')
            .then((response) => {
                result = response.data;
            })
            .catch((err) => {
                result = false;
            });
            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default UserAPI;