package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.repositories.TestRepository;
import com.grupo3.backfcyp.strategy.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Column;
import java.util.List;

@RestController
@RequestMapping(value = "/test")
public class TestService {

    @Autowired
    private TestRepository testRepository;

    @RequestMapping(value = "/create",method = RequestMethod.POST)
    @ResponseBody
    public String createTest(@RequestParam("id")Long id){

        return id.toString();
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Test> getTests(){
        return this.testRepository.findAll();
    }

    @Column
    @RequestMapping(value = "/all",method = RequestMethod.DELETE)
    public void deleteAll(){
        this.testRepository.deleteAll();
    }
}
