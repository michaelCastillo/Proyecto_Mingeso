package com.grupo3.backfcyp.strategy;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonParseException;
import com.grupo3.backfcyp.repositories.mongoRepos.CodeRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;

public class StrategyJava implements Strategy {
    private static final String STATUS = "status";
    
    private static Logger LOGGER = Logger.getLogger("InfoLogging");

    @Override
    public List<Results> executeProgram(Test test, ArrayList<String> o_inputs, CodeRepository codeRepository) {
        List<Results> results = new ArrayList<>();
        ArrayList<String> outputs = new ArrayList<String>();

        String output = "";
        for(int i = 0; i<o_inputs.size(); i++) {
            try {
                URL url = new URL("https://run.glot.io/languages/java/latest");
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

                String input = "{" + stdin + ",\"files\": [{\"name\":\"Main.java\", \"content\":  \"" + test.getCode(codeRepository) + "\"}]}";

                OutputStream outputStream = connection.getOutputStream();
                outputStream.write(input.getBytes());
                outputStream.flush();

                if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {

                    throw new RuntimeException(" HTTP error code : " + connection.getResponseCode());
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
                LOGGER.info(STATUS, e);
                return Collections.emptyList();
            } catch (IOException e) {
                LOGGER.info(STATUS, e);
                return Collections.emptyList();
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
            LOGGER.info(STATUS, e);
        } catch (JsonMappingException e) {
            LOGGER.info(STATUS, e);
        } catch (IOException e) {
            LOGGER.info(STATUS, e);
        }
        return results;
    }

}
