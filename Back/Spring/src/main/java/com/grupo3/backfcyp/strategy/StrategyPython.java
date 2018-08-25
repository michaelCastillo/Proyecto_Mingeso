package com.grupo3.backfcyp.strategy;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonParseException;
import com.grupo3.backfcyp.repositories.mongoRepos.CodeRepository;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class StrategyPython implements Strategy {


    @Override
    public List<Results> executeProgram(Test test, ArrayList<String> o_inputs, CodeRepository codeRepository) {
        DoodleConnection doodleConnection = DoodleConnection.getInstance();
        doodleConnection.setLanguaje("python");
        return doodleConnection.executeProgram(test,o_inputs,codeRepository);

    }

}
