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
        return this.roleRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/create",method = RequestMethod.POST)
    @ResponseBody
    public Role createRole(@Valid @RequestBody Role role){
        return this.roleRepository.save(role);
    }
}
