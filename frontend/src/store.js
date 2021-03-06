import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { gymDateCreateReducer, gymDateDetailsReducer } from './reducers/gymReducers';
const reducer = combineReducers({
  gymDateDetails: gymDateDetailsReducer,
  gymDateCreate: gymDateCreateReducer, 
}); //state setup korte hobef

//initial state setup korte hobe jeigula localstorage theke asbe arki
const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store; 