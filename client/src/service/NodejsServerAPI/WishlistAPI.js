import Authorization from '../../config/axiosBaseUrl/Authorization';
import axiosCustom from '../../config/axiosBaseUrl/axiosCustom'

const WishlistAPI = {
    getWishlistByUser: async () => {
        try {
            let result = null;
            await axiosCustom.get('/favorite')
            .then(res=>{
                console.log(res);
                result = res.data;
            })
            .catch(err=>{
                console.log(err);
                
            })
            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    addToWishlist: async (product_id) => {
        try {
            // console.log(data);
            let result = null;
            if(!Authorization()) return false;
         
            await axiosCustom.post(`/favorite/${product_id}`)
            .then(res=>{
                result = res.status;
            })
            .catch(err=>{
                console.log(err);
                
            })

            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
        }
    },
    removeFromWishlist: async (product_id) => {
        try {
            let result = null;
            console.log("delete from Wishlist");
            await axiosCustom.delete(`/favorite/${product_id}`)
            .then(res=>{
                result = res.status;
            })
            .catch(err=>{
                console.log(err);
                
            })

            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default WishlistAPI;