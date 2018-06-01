package com.grupo3.backfcyp.services;

import com.grupo3.backfcyp.repositories.SolutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/solutions")
public class SolutionService {

    @Autowired
    public SolutionRepository solutionRepository;
}
