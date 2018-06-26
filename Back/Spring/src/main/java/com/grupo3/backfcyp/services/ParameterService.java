package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Parameter;
import com.grupo3.backfcyp.models.Problem;
import com.grupo3.backfcyp.repositories.ParameterReporitory;
import com.grupo3.backfcyp.repositories.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/parameters")
public class ParameterService {

    @Autowired
    ParameterReporitory parameterReporitory;
    @Autowired
    ProblemRepository problemRepository;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Parameter> getParameters(){
        return this.parameterReporitory.findAll();
    }


    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Parameter createParameter(@RequestBody Parameter parameter){
        return parameter;

    }
    //Agregar un parametro con un problema asociado
    /*
    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(value = "/{id_problem}/createParameter",method = RequestMethod.POST)
    @ResponseBody
    public Parameter createParameterAndLink(@PathVariable Long id_problem, @RequestBody Parameter parameter ){

        Problem problem = problemRepository.findProblemById(id_problem);
        problem.addParameter(parameter);
        parameter.setProblem(problemRepository.findProblemById(id_problem));
        parameterReporitory.save(parameter);
        return parameter;
    }
*/

    /* Hay que enviarle un Json como este

    [
        {        parametro 1        },
        {        parametro 2        }
    ]
     */
    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(value = "/{id_problem}/createParameters", method = RequestMethod.POST)
    @ResponseBody
    public List<Parameter> createParameters(@PathVariable Long id_problem, @RequestBody List<Parameter> parameters){

        for (Parameter parameter: parameters) {
            Problem problem = problemRepository.findProblemById(id_problem);
            parameter.setProblem(problem);
            parameterReporitory.save(parameter);
        }
        problemRepository.findProblemById(id_problem).setParameters(parameters);

        return parameters;

    }

}
