import axios from 'axios';
import {saveRol} from './getRole';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const LOGIN_PERMISSION = 'permision_user';



const URL = 'http://46.101.81.136:8181/Backend/users';

export function signInAction( {email, password} , history) {
  return async (dispatch) => {
    const res = await axios.post(`${URL}/login/`,{ email, password });
    if(res.data.roles!= null){

      dispatch({ type: AUTHENTICATED });
      
      localStorage.setItem('user', res.data.token);      
      console.log(res.data);
      saveRol(res.data.roles);
    } else {
      console.log(email);
      console.log(password);
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      
      })
   }
  }
}