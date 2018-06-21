
import {LOGIN_PERMISSION } from './actionSign';

export function  saveRol(object) {       
        let roles = [];
        roles = object;
        const rolesf = roles.map(rol =>
        rol.role);
        console.log(rolesf); 
        localStorage.setItem('role', rolesf);
        return {
                type: LOGIN_PERMISSION
        };
}

      

