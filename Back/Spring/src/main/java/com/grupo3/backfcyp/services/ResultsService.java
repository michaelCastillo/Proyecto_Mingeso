package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.repositories.ResultsRepository;
import com.grupo3.backfcyp.strategy.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/results")
public class ResultsService {


    @Autowired
    private ResultsRepository resultsRepository;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Results> getResults(){
        return this.resultsRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/delete",method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteResult(@PathVariable Long id){
        this.resultsRepository.deleteById(id);
        System.out.println("Se ha borrado.  ");
    }

    @CrossOrigin
    @RequestMapping(value = "/deleteAll",method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteAll(){
        this.resultsRepository.deleteAll();
    }

}
