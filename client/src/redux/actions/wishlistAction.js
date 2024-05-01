
import WishlistAPI from "../../service/NodejsServerAPI/WishlistAPI";
import { FETCH_WISHLIST_DATA } from "../constant/constant";

const fetchWishlistData = () => {
    return async(dispatch) => {
        try {
            let wishlists = await WishlistAPI.getWishlistByUser();
            if(!wishlists){
                wishlists = await WishlistAPI.getWishlistByUser();
            }
            dispatch({
                type: FETCH_WISHLIST_DATA,
                wishlists: wishlists
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const addToWishlistAction = (product_id) => {
    return async() => {
        try {
            const result = await WishlistAPI.addToWishlist(product_id);
            if(result) return true;
            return false;
        } catch (error) {
            console.log(error);
        }
    }
    // const result = await wishlistAPI.addTowishlist();
    // return result;
}

const removeFromWishlist = (product_id) => {
    return async() => {
        try {
            const result = await WishlistAPI.removeFromWishlist(product_id);
            if(result) return true;
            return false;
        } catch (error) {
            console.log(error);
        }
    }
}   

export{
    fetchWishlistData,
    addToWishlistAction,
    removeFromWishlist
}