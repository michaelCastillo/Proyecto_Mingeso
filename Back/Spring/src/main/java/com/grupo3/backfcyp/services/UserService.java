package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Role;
import com.grupo3.backfcyp.models.Section;
import com.grupo3.backfcyp.models.User;
import com.grupo3.backfcyp.repositories.RoleRepository;
import com.grupo3.backfcyp.repositories.SectionRepository;
import com.grupo3.backfcyp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/users")
public class UserService {

    @Autowired
    public UserRepository userRepository;
    @Autowired
    public RoleRepository roleRepository;
    @Autowired
    public SectionRepository sectionRepository;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<User> getUsers(){
        return this.userRepository.findAll();
    }


    //Creacion de un usuario de cualquier tipo a partir de roles ya creados.
    @CrossOrigin
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public User createUser(@Valid @RequestBody User user){
        List<Role> roleList;
        if(!(roleList = user.getRoles()).isEmpty()){
            for(Role role: roleList){
                Role role_exist = roleRepository.findRoleByRole(role.getRole());
                if(role_exist != null){//Si el rol existe
                    role_exist.getUsers().add(user);
                }
            }
        }
        List<Section> sectionList;
        if((sectionList =  user.getSections() ) != null){
            for(Section section: sectionList){
                Section section_exist = this.sectionRepository.findSectionByCode(section.getCode());
                if(section_exist != null){
                    section_exist.getUsers().add(user);
                }
            }
        }
        return this.userRepository.save(user);
    }

    @CrossOrigin
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> login(@RequestBody User user){
        Map<String,String> user_data = new HashMap<String,String>();
        System.out.println("Usuario:   " + user.getEmail() + "  " + user.getPassword());
        Map<String,Object> response = new HashMap<String,Object>();
        User userFronRepo = this.userRepository.findUserByEmailAndPasswordIgnoreCase(user.getEmail(),user.getPassword().toString());
        if(userFronRepo != null){
            user_data.put("logged","in");
            user_data.put("id",userFronRepo.getId().toString());
            user_data.put("name",userFronRepo.getName());
            user_data.put("email",userFronRepo.getEmail());
            response.put("user",user_data);
            response.put("roles",userFronRepo.getRoles());
        }else{
            user_data.put("logged","out");
            user_data.put("id","");
            user_data.put("name","");
            user_data.put("email","");
            response.put("user",user_data);
            response.put("roles",null);
        }
        return response;
    }





}
