package com.grupo3.backfcyp.strategy;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonParseException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

public class StrategyJava implements Strategy {


    @Override
    public Results executeProgram(Code code) {
        Results results = null;
        String clientId = "9cf4866b-8e10-4e3a-84bf-2ee26e40c992"; //Replace with your client ID
        ArrayList<String> outputs = new ArrayList<String>();
        String output = new String();
        try {
            URL url = new URL("https://run.glot.io/languages/java/latest");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("authorization", "Token f2b9a615-ef8b-4238-b93b-f27eb13a1d6f");
            ArrayList<String> inputs = code.getO_inputs();
            String stdin;
            if(!inputs.isEmpty()){
                stdin= "\"stdin\":\"" + code.getO_inputs().get(0)+"\"";
            }else{
                stdin ="\"stdin\":\"\"" ;
            }

            String input = "{"+stdin +",\"files\": [{\"name\":\"Main.java\", \"content\":  \"" + code.getCode() + "\"}]}";
            System.out.println(input);

            OutputStream outputStream = connection.getOutputStream();
            outputStream.write(input.getBytes());
            outputStream.flush();

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {

                throw new RuntimeException("Please check your inputs : HTTP error code : "+ connection.getResponseCode());
            }

            BufferedReader bufferedReader;
            bufferedReader = new BufferedReader(new InputStreamReader(
                    (connection.getInputStream())));


            System.out.println("Output from JDoodle .... \n");
            while ((output = bufferedReader.readLine()) != null) {
                results = parseResults(output,code);
                outputs.add(output);
                System.out.println(output);
            }

            connection.disconnect();
            return results;
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return results;
        } catch (IOException e) {
            e.printStackTrace();
            return results;
        }


    }
    private Results parseResults(String resultsOnJson, Code code){
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
