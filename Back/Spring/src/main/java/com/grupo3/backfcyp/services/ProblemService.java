package com.grupo3.backfcyp.services;

import com.grupo3.backfcyp.models.*;
import com.grupo3.backfcyp.repositories.ProblemRepository;
import com.grupo3.backfcyp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/problems")
public class ProblemService {

    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<Map<String, String>> getProblems() {

        return this.problemRepository.findAllProblemsReduced();

    }

    @CrossOrigin()
    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Problem getProblemById(@PathVariable Long id) {
        return this.problemRepository.findProblemById(id);
    }

    // Servicio para obtener el usuario relacionado a un problema, según la ID.
    @CrossOrigin
    @RequestMapping(value = "/{id}/getUser", method = RequestMethod.GET)
    @ResponseBody
    public String getUser(@PathVariable Long id) {

        return this.problemRepository.findProblemById(id).getTeacher().getName();
    }

    @CrossOrigin()
    @RequestMapping(value = "/create/{id}")
    @ResponseBody
    public Map<String, Object> createProblem(@PathVariable Long id, @Valid @RequestBody Problem problem) {
        User user = this.userRepository.findUserById(id);
        Map<String,Object> response = new HashMap<String,Object>();
        int index =0;
        if(user != null){ //Si el usuario existe.
            if(!user.getRoles().isEmpty()){ //Si tiene roles asignados.
                for(Role role : user.getRoles()){
                    if((role.getRole().compareTo("teacher") == 0) || (role.getRole().compareTo("su") == 0)){//Si es profesor
                        for(Parameter parameter: problem.obtenerParametersObj()){
                            parameter.setProblem(problem);
                            parameter.setPos(index);
                            //this.parameterReporitory.save(parameter);
                        }
                        for(Return return_: problem.getReturns()){
                            return_.setProblem(problem);
                            return_.setPos(index);
                            //this.returnRepository.save(return_);
                        }
                        problem.setTeacher(user);
                        //Aqui se hace la consulta a mongo para guardar el statement
                        this.problemRepository.save(problem);
                        index++;

                        List<Problem> problems = user.getProblems();
                        problems.add(problem);
                        user.setProblems(problems);
                        response.put("status","added");
                        response.put("problem",problem);
                        return response;

                    }
                    problem.setTeacher(user);
                    // Aqui se hace la consulta a mongo para guardar el statement
                    this.problemRepository.save(problem);

                    List<Problem> problems = user.getProblems();
                    problems.add(problem);
                    user.setProblems(problems);
                    response.put("status", "added");
                    response.put("problem", problem);
                    return response;
                }
            }
        }
        response.put("status", "error");
        response.put("problem", null);
        return response;
    }


    @CrossOrigin()
    @PutMapping(value = "/createProblem/{id}/put")
    @ResponseBody
    public Problem updateProblem(@PathVariable Long id, @Valid @RequestBody Problem problem) {
        return this.problemRepository.save(problem);
    }


}
