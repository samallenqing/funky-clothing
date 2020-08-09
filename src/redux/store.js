import {applyMiddleware, createStore} from "redux";
import logger from 'redux-logger'
import rootReducer from './root-reducer'
import {persistStore} from "redux-persist";
import thunk from "redux-thunk";

const middleware = [thunk];

if (process.env.NODE_ENV === 'development'){
    middleware.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

const persistor = persistStore(store);

export {store, persistor};