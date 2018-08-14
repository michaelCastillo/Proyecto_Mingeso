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
import java.util.logging.Logger;

public class StrategyPython implements Strategy {
    private static Logger LOGGER = Logger.getLogger("InfoLogging");

    private static final String STATUS = "status";

    @Override
    public List<Results> executeProgram(Test test, ArrayList<String> o_inputs, CodeRepository codeRepository) {
        List<Results> results = new ArrayList<>();
        ArrayList<String> outputs = new ArrayList<String>();
        String output = "";

        for(int i = 0; i<o_inputs.size(); i++) {
            //Se hace un llamado por cada uno de los parametros de entrada

            try {
                //Aqui hacer el for para ejecutar el codigo tantas veces como parametros existan.

                URL url = new URL("https://run.glot.io/languages/python/2");
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setDoOutput(true);
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setRequestProperty("authorization", "Token f2b9a615-ef8b-4238-b93b-f27eb13a1d6f");

                String stdin;
                if (!o_inputs.isEmpty()) {
                    stdin = "\"stdin\":\"" + o_inputs.get(i) + "\"";
                } else {
                    stdin = "\"stdin\":\"\"";
                }

                String input = "{" + stdin + ",\"files\": [{\"name\":\"main.py\", \"content\":  \"" + test.getCode(codeRepository) + "\"}]}";

                OutputStream outputStream = connection.getOutputStream();
                outputStream.write(input.getBytes());
                outputStream.flush();

                if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                    throw new RuntimeException("Error http : " + connection.getResponseCode());
                }

                BufferedReader bufferedReader;
                bufferedReader = new BufferedReader(new InputStreamReader(
                        (connection.getInputStream())));



                while ((output = bufferedReader.readLine()) != null) {
                    results.add(parseResults(output));
                    outputs.add(output);
                }

                connection.disconnect();

            } catch (MalformedURLException e) {
                System.out.println("Error ", e);
                return Collections.emptyList(); //Se retorna un mensaje por JSON
            } catch (IOException e) {
                System.out.println("Error ", e);
                return Collections.emptyList(); //Se retorna un mensaje por JSON
            }
        }
        return results;

    }


    private Results parseResults(String resultsOnJson){
        ObjectMapper mapper = new ObjectMapper();
        Results results = new Results();
        try {
            results = mapper.readValue(resultsOnJson, Results.class);

        } catch (JsonParseException e) {
            System.out.println("Error ", e);
        } catch (JsonMappingException e) {
            System.out.println("Error ", e);
        } catch (IOException e) {
            System.out.println("Error ", e);
        }
        return results;
    }

}
