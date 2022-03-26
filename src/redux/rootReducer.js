import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from './cart/cart.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['cart']
}
// if we create multiple reducers
const rootReducer = combineReducers({
    cart: cartReducer
})
export default persistReducer(persistConfig, rootReducer)