package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Problem;
import com.grupo3.backfcyp.models.User;
import com.grupo3.backfcyp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class UserService {


    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<User> getAllUsers(){
        return this.userRepository.findAll();
    }

    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public User getUser(@PathVariable Long id)
    {
        return userRepository.findUserById(id);
    }


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
        List<User> users = this.userRepository.findAll();

        for (User userFromList:
             users) {
            if( (user.getName().compareTo(userFromList.getName()) == 0) && (user.getPassword().compareTo(userFromList.getPassword()) == 0)){
                return user;
            }
        }
        return null;
    }


    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(value = "/getProblems/{id}",method = RequestMethod.GET)
    @ResponseBody
    public List<Problem> getProblems(@PathVariable Long id) {
        return this.userRepository.findUserById(id).getProblems();
    }

    @CrossOrigin(origins = {"http://localhost:3000"})
    //Se guarda un usuario (Sin problemas asociados)
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public User createUser(@RequestBody User user){

        return userRepository.save(user);

    }

    @CrossOrigin()
    @RequestMapping(value = "/put/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public User updateUser(@PathVariable Long id ,@Valid @RequestBody User user){
        User userFromRepo = this.userRepository.findUserById(id);
        userFromRepo.setName(user.getName());
        userFromRepo.setPassword(user.getPassword());
        return user;
    }

    @CrossOrigin()
    @RequestMapping(value = "/delete/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        this.userRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }



}
