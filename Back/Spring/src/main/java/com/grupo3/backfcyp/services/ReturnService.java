package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Problem;
import com.grupo3.backfcyp.models.Return;
import com.grupo3.backfcyp.repositories.ProblemRepository;
import com.grupo3.backfcyp.repositories.ReturnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/returns")
public class ReturnService {

    @Autowired
    ReturnRepository returnRepository;

    @Autowired
    ProblemRepository problemRepository;

    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(value = "/{id_problem}/saveReturns", method = RequestMethod.POST)
    @ResponseBody
    public List<Return> createReturnsOnProblem(@PathVariable Long id_problem, @RequestBody List<Return> returns){

        for (Return objReturn:  returns ) {
            Problem problem = problemRepository.findProblemById(id_problem);
            objReturn.setProblem(problem);
            returnRepository.save(objReturn);
        }
        problemRepository.findProblemById(id_problem).setReturns(returns);
        return returns;
    }

}
