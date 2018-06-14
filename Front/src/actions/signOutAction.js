
import { UNAUTHENTICATED } from './actionSign';


export function signOutAction() {
    localStorage.clear();
    console.log("ha salido");

    return {
      type: UNAUTHENTICATED
    };
  }