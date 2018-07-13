package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Career;
import com.grupo3.backfcyp.repositories.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/careers")
public class CareerService {

    @Autowired
    CareerRepository careerRepository;


    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Career createCareer(@RequestBody Career career){
        return this.careerRepository.save(career);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Career> careerList(){
        return this.careerRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Career getCareer(@PathVariable Long id){
        return this.careerRepository.findCareerById(id);
    }
}
