package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Section;
import com.grupo3.backfcyp.models.User;
import com.grupo3.backfcyp.repositories.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/sections")
public class SectionService {


    @Autowired
    private SectionRepository sectionRepository;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Section> getSections(){
        return this.sectionRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Section getSectionById(@PathVariable Long id){
        return this.sectionRepository.findSectionById(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public Section createSection(@Valid @RequestBody Section section){
        return this.sectionRepository.save(section);
    }

    @CrossOrigin
    @RequestMapping
    @ResponseBody
    public Section addUser(@PathVariable Long id, @Valid @RequestBody User user){
        Section section = this.sectionRepository.findSectionById(id);
        section.getUsers().add(user);
        return section;
    }

}
