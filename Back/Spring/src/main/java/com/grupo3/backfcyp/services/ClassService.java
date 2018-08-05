package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Class;
import com.grupo3.backfcyp.models.Role;
import com.grupo3.backfcyp.models.User;
import com.grupo3.backfcyp.repositories.ClassRepository;
import com.grupo3.backfcyp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/classes")
public class ClassService {

    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private UserRepository userRepository;


    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Class> getClasses(){
        return this.classRepository.findAll();
    }
    @CrossOrigin
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Class getClasses(@PathVariable Long id){
        return this.classRepository.findClassById(id);
    }
    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Class createClass(@RequestBody Class studyClass){
        return this.classRepository.save(studyClass);
    }
    @CrossOrigin
    @RequestMapping(value = "/{id}/teachers",method = RequestMethod.GET)
    @ResponseBody
    public List<User> getTeachers(@PathVariable Long id){
        return this.classRepository.findClassById(id).getTeachers();
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/students",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getStudents(@PathVariable Long id){
        Class classToFront;
        Map<String,Object> response = new HashMap<>();
        if((classToFront = this.classRepository.findClassById(id)) != null){
            response.put("status","class exist");
            response.put("students",classToFront.getStudents());
        }else{
            response.put("status","class doesn't exist");
            response.put("students",null);
        }
        return response;

    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/setTeacher",method = RequestMethod.PUT)
    @ResponseBody
    public Map<String,Object> setTeacher(@PathVariable Long id, @RequestBody User user){
        User user1;
        Class classToEdit;
        Map<String,Object> response = new HashMap<>();
        if((classToEdit = this.classRepository.findClassById(id)) != null) {//si la clase existe


            if ((user1 = this.userRepository.findUserById(user.getId())) != null) {//si el usuario existe
                boolean isTeacher = false;
                for (Role role : user1.getRoles()) {

                    if (role.getRole().compareTo("teacher") == 0) {
                        isTeacher = true;
                    }
                    if (isTeacher) {
                        //si es profesor
                        user1.getClasses_teachers().add(classToEdit);
                        classToEdit.getTeachers().add(user);
                        response.put("status","teacher added");
                    } else {
                        response.put("status", "user have not the permissions");

                    }
                    response.put("class", classToEdit);
                }


            } else {
                response.put("status","user doesn't exist");
                response.put("class",classToEdit);
            }
        }else{
            response.put("status","class doesn't exist");
            response.put("class",classToEdit);
        }
        return response;
    }
}
