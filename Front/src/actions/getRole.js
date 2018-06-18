
export function  saveRol(object) {       
        let roles = [];
        roles = object;
        const rolesf = roles.map(rol =>rol.role);
        console.log(rolesf); 
        return rolesf;
}

      

