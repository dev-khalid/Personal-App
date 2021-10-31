import { GYM_DATE_CREATE_SUCCESS, GYM_DATE_DETAILS_FAIL, GYM_DATE_DETAILS_REQUEST, GYM_DATE_DETAILS_SUCCESS } from '../constants/gymConstants';

export const gymDateDetailsReducers = (state = {}, action) => {
  switch (action.type) {
    case GYM_DATE_DETAILS_REQUEST:
      return { loading: true };
    case GYM_DATE_DETAILS_SUCCESS: 
      return { 
        loading: false, 
        details: action.payload
      }
    case GYM_DATE_DETAILS_FAIL: 
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
