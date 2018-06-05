package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Student;
import com.grupo3.backfcyp.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/student")
public class StudentService {

    @Autowired
    public StudentRepository studentRepository;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Student> getStudents(){
        return this.studentRepository.findAll();
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Student login(@RequestBody Student student){
        List<Student> students = this.studentRepository.findAll();
        for(Student student_el: students){
            if((student.getName().compareTo(student_el.getName()) == 0 )&& (student.getPassword().compareTo(student_el.getPassword()) == 0) ){
                System.out.println("Exito");
                return student_el;
            }
        }
        Student studentNull = new Student("null");
        return studentNull;
    }

    @RequestMapping(value = "/create",method = RequestMethod.POST)
    @ResponseBody
    public Student create(@RequestBody Student student){
        this.studentRepository.save(student);
        return student;
    }
}
