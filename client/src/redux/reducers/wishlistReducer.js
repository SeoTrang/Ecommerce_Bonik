import { FETCH_CART_DATA, FETCH_WISHLIST_DATA } from "../constant/constant";

const initialState = {
    wishlists: []
};

const wishlistReducer = (state = initialState, action) => {
    // Xử lý các action liên quan đến language
    console.log(action);
    switch (action.type) {
        case FETCH_WISHLIST_DATA:
            return {
                wishlists: action.wishlists
            }
        
        default:
            return state;
    }
};

export default wishlistReducer;