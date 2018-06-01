package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Student;
import com.grupo3.backfcyp.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/student")
public class StudentService {

    @Autowired
    public StudentRepository studentRepository;



}
