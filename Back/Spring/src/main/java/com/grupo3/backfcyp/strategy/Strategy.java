package com.grupo3.backfcyp.strategy;

import com.grupo3.backfcyp.repositories.mongoRepos.CodeRepository;

import java.util.ArrayList;
import java.util.List;

public interface Strategy {

    public List<Results> executeProgram(Test test, ArrayList<String> o_inputs, CodeRepository codeRepository);

}
