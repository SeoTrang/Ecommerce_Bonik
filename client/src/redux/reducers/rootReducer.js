//rootReducer.js
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';
import wishlistReducer from './wishlistReducer';


const rootReducer = combineReducers({
  cart: cartReducer,
  loading: loadingReducer,
  user: userReducer,
  wishlist: wishlistReducer
});

export default rootReducer;