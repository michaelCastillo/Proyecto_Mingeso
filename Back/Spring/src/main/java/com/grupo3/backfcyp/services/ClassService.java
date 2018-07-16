package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Class;
import com.grupo3.backfcyp.repositories.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/classes")
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Class> getClasses(){
        return this.classRepository.findAll();
    }
    @CrossOrigin
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Class getClasses(@PathVariable Long id){
        return this.classRepository.findClassById(id);
    }
    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Class createClass(@RequestBody Class studyClass){
        return this.classRepository.save(studyClass);
    }
}
