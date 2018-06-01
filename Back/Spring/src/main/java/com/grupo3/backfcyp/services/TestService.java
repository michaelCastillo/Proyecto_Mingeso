package com.grupo3.backfcyp.services;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/test")
public class TestService {

    @RequestMapping(value = "/create",method = RequestMethod.POST)
    @ResponseBody
    public String createTest(@RequestParam("id")Long id){

        return id.toString();
    }
}
