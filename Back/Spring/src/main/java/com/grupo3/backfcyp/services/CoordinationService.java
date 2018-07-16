package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Coordination;
import com.grupo3.backfcyp.models.User;
import com.grupo3.backfcyp.repositories.CoordinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/coordinations")
public class CoordinationService {


    @Autowired
    private CoordinationRepository coordinationRepository;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Coordination> getSections(){
        return this.coordinationRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Coordination getSectionById(@PathVariable Long id){
        return this.coordinationRepository.findSectionById(id);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Coordination createSection(@Valid @RequestBody Coordination coordination){
        return this.coordinationRepository.save(coordination);
    }


}
