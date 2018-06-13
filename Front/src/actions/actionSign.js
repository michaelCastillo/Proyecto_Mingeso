import axios from 'axios';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';


const URL = 'http://46.101.81.136:8181/Backend/users';

export function signInAction( {email, password} , history) {
  return async (dispatch) => {
   
    try {
      const res = await axios.post(`${URL}/login/`,{ email, password });

      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', res.data.token);
      console.log(res.data);
      history.push('/home');
    } catch(error) {
      console.log(email);
      console.log(password);
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}