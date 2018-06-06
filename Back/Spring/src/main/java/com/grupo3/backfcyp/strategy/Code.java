package com.grupo3.backfcyp.strategy;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.lang.reflect.Array;
import java.util.ArrayList;

public class Code {
    private String code;
    private ArrayList<String> o_inputs;
    private ArrayList<String> o_outputs;
    private Strategy strategy;
    private String language;
    private Results results;



    public Code(Strategy strategy){
        this.strategy = strategy;
    }

    public Code(String code, ArrayList<String> o_inputs){
        this.code = code;
        this.o_inputs = o_inputs;
    }
    public Code(){

    }



    public void exec(){
        System.out.println(this.language);
        if(this.language.compareTo("python") == 0){
            System.out.println("Es python!");
            //Si es python.
            this.strategy = new StrategyPython();
        }else if(this.language.compareTo("c") == 0){
            this.strategy = new StrategyC();
            System.out.println("Es C");
        }else if(this.language.compareTo("java") == 0){
            System.out.println("Es java!");
            this.strategy = new StrategyJava();
            //Strategy java.
        }
        //Se ejecuta y retorna los resultados.
        results = this.strategy.executeProgram(this);


        //Si no tiene errores entonces las salidas se hicieron
        //correctamente
        System.out.println("Salida:");;
        System.out.println(results.getStdout());
        System.out.println("Errores: ");
        System.out.println(results.getError());

    }


    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public ArrayList<String> getO_inputs() {
        return o_inputs;
    }

    public void setO_inputs(ArrayList<String> o_inputs) {
        this.o_inputs = o_inputs;
    }

    public ArrayList<String> getO_outputs() {
        return o_outputs;
    }

    public void setO_outputs(ArrayList<String> o_outputs) {
        this.o_outputs = o_outputs;
    }

    public Strategy getStrategy() {
        return strategy;
    }

    public void setStrategy(Strategy strategy) {
        this.strategy = strategy;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Results getResults() {
        return results;
    }

    public void setResults(Results results) {
        this.results = results;
    }
}
