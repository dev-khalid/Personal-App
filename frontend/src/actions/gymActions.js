import {
  GYM_DATE_DETAILS_REQUEST,
  GYM_DATE_DETAILS_FAIL,
  GYM_DATE_DETAILS_SUCCESS,
  GYM_DATE_CREATE_REQUEST,
  GYM_DATE_CREATE_SUCCESS,
  GYM_DATE_CREATE_FAIL,
} from '../constants/gymConstants';
import axios from 'axios';  
export const getGymData = (month, year) => async (dispatch, getState) => {
  try {
    //loading
    dispatch({ type: GYM_DATE_DETAILS_REQUEST });
    //success
    const {data} = await axios.get('api/gym');  
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

export const postGymData = (userId,gymDate) => async(dispatch) => { 
  try {
    dispatch({
      type: GYM_DATE_CREATE_REQUEST
    }); 
    const {data} = await axios.post('/api/gym',{userId,gymDate: new Date(gymDate).getTime()});
    dispatch({
      type: GYM_DATE_CREATE_SUCCESS, 
      payload: data
    }) 
  } catch (error) {
    dispatch({ 
      type: GYM_DATE_CREATE_FAIL, 
      payload: error
    })
  }
}
