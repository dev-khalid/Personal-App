import { GYM_DATE_DETAILS_REQUEST } from '../constants/gymConstants';

export const gymDateDetailsReducers = (state,action) => { 
  switch(action.type) {
    case GYM_DATE_DETAILS_REQUEST: 
      return {loading: true}
    default: 
      return state;
  }
}