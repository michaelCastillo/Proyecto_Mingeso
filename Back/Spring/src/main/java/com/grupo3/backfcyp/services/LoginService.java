package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.repositories.CoordinationRepository;
import com.grupo3.backfcyp.repositories.StudentRepository;
import com.grupo3.backfcyp.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/login")
public class LoginService {

    @Autowired
    private CoordinationRepository coordinationRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TeacherRepository teacherRepository;







}
