package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.*;
import com.grupo3.backfcyp.repositories.CoordinationRepository;
import com.grupo3.backfcyp.repositories.StudentRepository;
import com.grupo3.backfcyp.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class UserService {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private CoordinationRepository coordinationRepository;

    @CrossOrigin()
    @RequestMapping(value="/login",method = RequestMethod.POST)
    @ResponseBody
    public User login(@RequestBody User user){
        //se valida si se encuentra el usuario en la base de datos.
        if(user != null){
            if( userExist(user) != null ){
                System.out.println("Existe el usuario");
                return user;
            }else{
                System.out.println("No existe el usuario");
                return null;
            }
        }
        return null;

    }

    private User userExist(User user){
        if(user.getType().compareTo("student") == 0){
            List<Student> users = studentRepository.findAll();
            for (Student userFromList:
                    users) {
                if( (user.getName().compareTo(userFromList.getName()) == 0) && (user.getPassword().compareTo(userFromList.getPassword()) == 0)){
                    return userFromList;
                }
            }
        }else if(user.getType().compareTo("coordination") == 0){
            List<Coordination> users = coordinationRepository.findAll();
            for (Coordination userFromList:
                    users) {
                if( (user.getName().compareTo(userFromList.getName()) == 0) && (user.getPassword().compareTo(userFromList.getPassword()) == 0)){
                    return userFromList;
                }
            }
        }else if(user.getType().compareTo("teacher") == 0){
            List<Teacher> users = teacherRepository.findAll();
            for (Teacher userFromList:
                    users) {
                if( (user.getName().compareTo(userFromList.getName()) == 0) && (user.getPassword().compareTo(userFromList.getPassword()) == 0)){
                    return userFromList;
                }
            }
        }else{
            System.out.println("El tipo de usuario no existe.");
        }

        return null;
    }

/*
    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(value = "/getProblems/{id}",method = RequestMethod.GET)
    @ResponseBody
    public List<Problem> getProblems(@PathVariable Long id) {
        return this.userRepository.findUserById(id).getProblems();
    }
*/

}
