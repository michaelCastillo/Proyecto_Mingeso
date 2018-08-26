import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR,LOGIN_PERMISSION, LOADING} from '../actions/actionSign';


export default function(state={}, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, authenticated: true };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    case LOGIN_PERMISSION:
      const role = localStorage.getItem('role');
      return { ...state, permission: role };
    case LOADING:
      //Escrito como error, pese a no ser un error
      return { ...state, error: action.payload};
  }
  return state;
}