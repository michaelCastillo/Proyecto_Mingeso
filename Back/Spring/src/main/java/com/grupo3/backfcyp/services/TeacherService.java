package com.grupo3.backfcyp.services;

import com.grupo3.backfcyp.models.Teacher;
import com.grupo3.backfcyp.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/teachers")
public class TeacherService {

    @Autowired
    public TeacherRepository teacherRepository;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Teacher> getTeachers(){
        return this.teacherRepository.findAll();
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Teacher login(@RequestBody Teacher teacher){
        List<Teacher> teachers = this.teacherRepository.findAll();
        for(Teacher teacher_el: teachers){
            if((teacher.getName().compareTo(teacher_el.getName()) ==0 ) && (teacher.getPassword().compareTo(teacher_el.getPassword()) == 0 )){
                System.out.println("Exito");
                return teacher_el;
            }
        }
        Teacher teacherNull = new Teacher("null");
        return teacherNull;
    }

    @RequestMapping(value = "/create",method = RequestMethod.POST)
    @ResponseBody
    public Teacher createTeacher(@RequestBody Teacher teacher){
        this.teacherRepository.save(teacher);
        return teacher;
    }
}
