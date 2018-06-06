package com.grupo3.backfcyp.services;


import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.grupo3.backfcyp.strategy.Code;
import com.grupo3.backfcyp.strategy.Results;
import com.grupo3.backfcyp.strategy.StrategyPython;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

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
