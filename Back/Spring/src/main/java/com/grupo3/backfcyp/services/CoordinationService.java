package com.grupo3.backfcyp.services;

import com.grupo3.backfcyp.repositories.CoordinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/coordinations")
public class CoordinationService {

    @Autowired
    public CoordinationRepository coordinationRepository;
}
