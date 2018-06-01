package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Problem;
import com.grupo3.backfcyp.models.User;
import com.grupo3.backfcyp.repositories.ProblemRepository;
import com.grupo3.backfcyp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/problems")
public class ProblemService {


    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(method = RequestMethod.GET)
    public List<Problem> getProblems(){

        return this.problemRepository.findAll();
    }

    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Problem getProblemById(@PathVariable Long id){
        return this.problemRepository.findProblemById(id);
    }

    //Servicio para obtener el usuario relacionado a un problema, según la ID.
    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(value = "/{id}/getUser", method = RequestMethod.GET)
    @ResponseBody
    public String getUser(@PathVariable Long id){

        return this.problemRepository.findProblemById(id).getUser().getName();
    }

    //Se agrega un problema asociado a un usuario
    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(value = "/{id}/createProblem",method = RequestMethod.POST)
    @ResponseBody
    public Problem createProblem(@PathVariable Long id, @RequestBody Problem problem ){

        //Si el usuario existe.
        if(userRepository.findUserById(id) != null){

            problem.setUser(userRepository.findUserById(id));
            return this.problemRepository.save(problem);
        }else{
            //Se debe imprimir por la página
            System.out.printf("El usuario no existe!\n");
            return null;
        }
    }
    /*
    @PostMapping("/{userId}/problems")
    @ResponseBody
    public Problem createProblem(@PathVariable (value = "userId") Long id_user,
                                 @Valid @RequestBody Problem problem   ) {


    }
*/
}
