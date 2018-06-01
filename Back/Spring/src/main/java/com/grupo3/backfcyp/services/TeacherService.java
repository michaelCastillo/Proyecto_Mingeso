package com.grupo3.backfcyp.services;

import com.grupo3.backfcyp.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/teachers")
public class TeacherService {

    @Autowired
    public TeacherRepository teacherRepository;
}
