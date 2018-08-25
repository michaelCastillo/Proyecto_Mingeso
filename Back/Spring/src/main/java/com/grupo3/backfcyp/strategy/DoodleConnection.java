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
import java.util.List;

public class DoodleConnection {

    private String languaje;

    private static DoodleConnection ourInstance = new DoodleConnection();

    public static DoodleConnection getInstance() {
        return ourInstance;
    }

    private DoodleConnection() {
    }

    public void setLanguaje(String languaje) {
        this.languaje = languaje;
    }

    public List<Results> executeProgram(Test test, ArrayList<String> o_inputs, CodeRepository codeRepository){
        List<Results> results = new ArrayList<>();
        ArrayList<String> outputs = new ArrayList<>();
        String output;
        ArrayList<String> inputs = o_inputs;
        for(int i = 0; i<o_inputs.size(); i++) {
            try {
                URL url;
                if(this.languaje.compareTo("python") != 0){
                    url = new URL("https://run.glot.io/languages/"+this.languaje+"/latest");
                }else{
                    url = new URL("https://run.glot.io/languages/python/2");
                }

                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setDoOutput(true);
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setRequestProperty("authorization", "Token f2b9a615-ef8b-4238-b93b-f27eb13a1d6f");

                String stdin;
                if (!inputs.isEmpty()) {
                    stdin = "\"stdin\":\"" + inputs.get(i) + "\"";
                } else {
                    stdin = "\"stdin\":\"\"";
                }

                String mainFileName = "";

                if(this.languaje.compareTo("python") ==0){
                    mainFileName = "main.py";
                }else if(this.languaje.compareTo("java") ==0){
                    mainFileName ="main.java";
                }else if(this.languaje.compareTo("c") ==0){
                    mainFileName = "main.c";
                }
                String input = "{" + stdin + ",\"files\": [{\"name\":\""+mainFileName+"\", \"content\":  \"" + test.getCode(codeRepository) + "\"}]}";

                OutputStream outputStream = connection.getOutputStream();
                outputStream.write(input.getBytes());
                outputStream.flush();

                if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {

                    throw new RuntimeException("Please check your inputs : HTTP error code : " + connection.getResponseCode());
                }

                BufferedReader bufferedReader;
                bufferedReader = new BufferedReader(new InputStreamReader(
                        (connection.getInputStream())));


                System.out.println("Output from JDoodle .... \n");
                while ((output = bufferedReader.readLine()) != null) {
                    results.add(parseResults(output));
                    outputs.add(output);
                }

                connection.disconnect();

            } catch (MalformedURLException e) {
                e.printStackTrace();
                return results;
            } catch (IOException e) {
                e.printStackTrace();
                return results;
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
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return results;
    }
}
