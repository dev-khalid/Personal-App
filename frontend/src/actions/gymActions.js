import {
  GYM_DATE_DETAILS_REQUEST,
  GYM_DATE_DETAILS_FAIL,
  GYM_DATE_DETAILS_SUCCESS,
} from '../constants/gymConstants';
import axios from 'axios'; 
export const getGymData = (month, year) => async (dispatch, getState) => {
  try {
    //loading
    dispatch({ type: GYM_DATE_DETAILS_REQUEST });
    //success
    const {data} = await axios.get('api/gym'); 
    console.log(data)
    dispatch({
      type: GYM_DATE_DETAILS_SUCCESS, 
      payload: data
    }) 

  } catch (error) {
    console.table(error); 
    dispatch({
      type: GYM_DATE_DETAILS_FAIL,
      payload: error
    })
  }
};
