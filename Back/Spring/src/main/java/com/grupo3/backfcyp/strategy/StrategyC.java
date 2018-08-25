package com.grupo3.backfcyp.strategy;

import com.grupo3.backfcyp.repositories.mongorepos.CodeRepository;

import java.util.ArrayList;
import java.util.List;

public class StrategyC implements Strategy {
    @Override
    public List<Results> executeProgram(Test test, ArrayList<String> o_inputs, CodeRepository codeRepository) {
        DoodleConnection doodleConnection = DoodleConnection.getInstance();
        doodleConnection.setLanguaje("c");
        return doodleConnection.executeProgram(test,o_inputs,codeRepository);

    }

}
