package com.grupo3.backfcyp.services;


import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.grupo3.backfcyp.models.Solution;
import com.grupo3.backfcyp.strategy.Code;
import com.grupo3.backfcyp.strategy.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/code")
public class CodeService {




    @CrossOrigin()
    @RequestMapping(value = "/set", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> executeProgram(@RequestBody Code code){

        //Se ejecuta y se envian los resultados de la ejecucion
        code.exec();
        Results results= code.getResults();
        ArrayList<String> results_compare = code.compareResults(); //Se comparan los resultados
        Map<String,Object> return_to_front = new HashMap<String,Object>();
        return_to_front.put("results",results);
        return_to_front.put("comparison",results_compare);
        System.out.println(return_to_front);
        return return_to_front;
    }


}
