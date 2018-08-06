package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Role;
import com.grupo3.backfcyp.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/roles")
public class RoleService {

    @Autowired
    public RoleRepository roleRepository;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<Role> getRoles(){
        return (List<Role>)this.roleRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/create",method = RequestMethod.POST)
    @ResponseBody
    public Role createRole(@Valid @RequestBody Role role){
        return this.roleRepository.save(role);
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteRole(@PathVariable Long id){
        this.roleRepository.delete(this.roleRepository.findRoleById(id));
    }
    @CrossOrigin
    @RequestMapping(value = "/all",method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteAll(){
        this.roleRepository.deleteAll();
    }
}
