package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Problem;
import com.grupo3.backfcyp.repositories.ProblemRepository;
import com.grupo3.backfcyp.repositories.TeacherRepository;
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
    private TeacherRepository teacherRepository;

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

        return this.problemRepository.findProblemById(id).getTeacher().getName();
    }

    //Se agrega un problema asociado a un usuario
    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(value = "/createProblem/{id}",method = RequestMethod.POST)
    @ResponseBody
    public Problem createProblem(@PathVariable Long id, @RequestBody Problem problem ){

        //Si el usuario existe.
        if(teacherRepository.findTeacherById(id) != null){

            problem.setTeacher(teacherRepository.findTeacherById(id));
            return this.problemRepository.save(problem);
        }else{
            //Se debe imprimir por la página
            System.out.printf("El usuario no existe!\n");
            return null;
        }
    }
    @PutMapping(value = "/createProblem/{id}/put")
    @ResponseBody
    public Problem updateProblem(@PathVariable Long id,@Valid @RequestBody Problem problem){
        return this.problemRepository.save(problem);
    }

    /*
    @PostMapping("/{userId}/problems")
    @ResponseBody
    public Problem createProblem(@PathVariable (value = "userId") Long id_user,
                                 @Valid @RequestBody Problem problem   ) {


    }
*/
}
