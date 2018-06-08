package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.repositories.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/careers")
public class CareerService {

    @Autowired
    CareerRepository careerRepository;
}
