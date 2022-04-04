import { createStore } from "redux";
import { persistStore } from 'redux-persist';
// import logger from 'redux-logger';

import rootReducer from "./rootReducer";
// const middlewares = [logger]

// const store = createStore(rootReducer, applyMiddleware(...middlewares))
const store = createStore(rootReducer)
const persistor = persistStore(store)

const newStore = { store, persistor }
export default newStore