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


}
