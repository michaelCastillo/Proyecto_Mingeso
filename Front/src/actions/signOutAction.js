
import { UNAUTHENTICATED } from './actionSign';


export function signOutAction() {
    localStorage.clear();
    return {
      type: UNAUTHENTICATED
    };
  }