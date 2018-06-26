package com.grupo3.backfcyp.strategy;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

public class Code {
    private String code;
    private ArrayList<String> o_inputs;
    private ArrayList<String> o_outputs;
    private Strategy strategy;
    private String language;
    private Results results;
    private boolean isCorrect;


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
        this.results = this.strategy.executeProgram(this);


        //Si no tiene errores entonces las salidas se hicieron
        //correctamente
        System.out.println("Salida:");;
        System.out.println(results.getStdout());
        System.out.println("Errores: ");
        System.out.println(results.getError());

    }


    public ArrayList<String> compareResults(){
        //Por ahora se hace con una sola salida.
        Results results = this.getResults();
        ArrayList<String> result_compare = new ArrayList<>();
        int numCorrects = 0;
        if(results.getError().equals("")){
            String[] stdout_s = results.getStdout().split("\n");
            System.out.println("  Glot: "+stdout_s[0]+"  Front: " + this.o_outputs.get(0));
            if(stdout_s[0].equals(this.o_outputs.get(0))){
                System.out.println("Las salidas son iguales");
                numCorrects++;
                result_compare.add("Correcto");
            }else{
                result_compare.add("Incorrecto");
            }
        }
        if(numCorrects == result_compare.size()){
            this.isCorrect = true;
        }else{
            this.isCorrect = false;
        }
        return result_compare;
    }


    public String getCode() {
        return code;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
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
