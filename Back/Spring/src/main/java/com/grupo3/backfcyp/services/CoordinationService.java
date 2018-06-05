package com.grupo3.backfcyp.services;

import com.grupo3.backfcyp.models.Coordination;
import com.grupo3.backfcyp.repositories.CoordinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/coordinations")
public class CoordinationService {

    @Autowired
    public CoordinationRepository coordinationRepository;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Coordination> getCoordinations(){
        return this.coordinationRepository.findAll();
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Coordination login(@RequestBody Coordination coordination){
        List<Coordination> coordinationList = this.coordinationRepository.findAll();
        for(Coordination coordination_el: coordinationList){
            if((coordination_el.getName().compareTo(coordination.getName()) == 0) && (coordination_el.getPassword().compareTo(coordination.getPassword()) == 0)){
                System.out.println("Exito");
                return coordination_el;
            }
        }
        System.out.println("No existe");
        Coordination coordNull = new Coordination("null");
        return coordNull;
    }
    @RequestMapping(value = "/create",method = RequestMethod.POST)
    @ResponseBody
    public Coordination create(@Valid @RequestBody Coordination coordination){
        this.coordinationRepository.save(coordination);
        return coordination;
    }
}
