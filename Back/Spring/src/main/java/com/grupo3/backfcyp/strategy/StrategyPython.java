package com.grupo3.backfcyp.strategy;

import com.grupo3.backfcyp.repositories.mongoRepos.CodeRepository;

import java.util.ArrayList;
import java.util.List;

public class StrategyPython implements Strategy {


    @Override
    public List<Results> executeProgram(Test test, ArrayList<String> o_inputs, CodeRepository codeRepository) {
        DoodleConnection doodleConnection = DoodleConnection.getInstance();
        doodleConnection.setLanguaje("python");
        return doodleConnection.executeProgram(test,o_inputs,codeRepository);

    }

}
