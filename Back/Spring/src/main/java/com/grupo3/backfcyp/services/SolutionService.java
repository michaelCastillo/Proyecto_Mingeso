package com.grupo3.backfcyp.services;

import com.google.gson.JsonObject;
import com.grupo3.backfcyp.models.*;
import com.grupo3.backfcyp.repositories.ProblemRepository;
import com.grupo3.backfcyp.repositories.ResultsRepository;
import com.grupo3.backfcyp.repositories.SolutionRepository;
import com.grupo3.backfcyp.repositories.UserRepository;
import com.grupo3.backfcyp.strategy.Code;
import com.grupo3.backfcyp.strategy.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "/solutions")
public class SolutionService {

    @Autowired
    public SolutionRepository solutionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private ResultsRepository resultsRepository;



    /* Getter */
    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Solution> getSolutions(){
        return this.solutionRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/getIdsUsrPrb",method = RequestMethod.POST)
    @ResponseBody
    public Solution getSolutionByIdsUsrProb(@RequestBody JsonObject jsonObject){
        Long id_problem = Long.parseLong(jsonObject.get("id_problem").toString());
        Long id_user = Long.parseLong(jsonObject.get("id_user").toString());
        User student = this.userRepository.findUserById(id_user);
        Problem problem = this.problemRepository.findProblemById(id_problem);
        Solution solution = this.solutionRepository.findSolutionByStudentAndProblem(student,problem);
        if(solution != null){
            System.out.println("Solucion: ");
            System.out.println(solution);
            return solution;
        }else{
            return null;
        }
    }


    /*Create */
    @CrossOrigin
    @RequestMapping(value = "/create",method = RequestMethod.POST)
    @ResponseBody
    public Solution createSolution(@RequestBody Map<String,Object> jsonIn){

        User student = this.userRepository.findUserById(Long.parseLong(jsonIn.get("id_user").toString()));
        Problem problem = this.problemRepository.findProblemById(Long.parseLong(jsonIn.get("id_problem").toString()));
        Solution solutionFromRepo = this.solutionRepository.findSolutionByStudentAndProblem(student,problem);
        if(solutionFromRepo == null) {


            Solution solution = new Solution();
            solution.setStudent(student);
            solution.setProblem(problem);
            solution.setTitle(jsonIn.get("title").toString());
            solution.setCode(jsonIn.get("code").toString());
            solution.setErrors(jsonIn.get("errors").toString());
            solution.setClosed((boolean) jsonIn.get("closed"));
            solution.setSuccess((boolean) jsonIn.get("success"));
            solution.setSuccesses(Integer.parseInt(jsonIn.get("successes").toString()));
            solution.setFails(0);
            solution.setTime(0);
            //Se setea la fecha de hoy.
            Date today = new Date();
            System.out.println(today);
            solution.setTimestamp(today);
            System.out.println(solution.getTimestamp());
            return this.solutionRepository.save(solution);
        }else{
            System.out.println("La solución ya existe.");
            return solutionFromRepo;
        }

    }



    @CrossOrigin
    @RequestMapping(value = "/execute",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> executeCode(@RequestBody Map<String,Object> jsonIn){
        System.out.println(jsonIn);
        //Se extraen los valores del post.
        //Problem
        Long id_problem = Long.parseLong(jsonIn.get("id_problem").toString());
        Problem problem = this.problemRepository.findProblemById(id_problem);
        //Solution
        Long id_solution = Long.parseLong(jsonIn.get("id_solution").toString());
        Solution solution = this.solutionRepository.findSolutionById(id_solution);
        //SolutionLog
        //Code
        String codeFromFront = jsonIn.get("code").toString();
        ArrayList<String> params = new ArrayList<>();
        for(Parameter param : problem.getParameters()){
            params.add(param.getName());
        }
        ArrayList<String> returns = new ArrayList<>();
        for(Return return_o: problem.getReturns()){
            returns.add(return_o.getName());
        }
        Code code = new Code(codeFromFront,params);
        code.setLanguage(problem.getLanguage());
        code.setO_outputs(returns);
        //Se ejecuta el codigo
        code.exec();
        //Se obtienen los resultados
        Results results= code.getResults();
        results.setCode(code.getCode());
        //Se almacenan los resultados obtenidos de la ejecución.
        //Se comparan los resultados.
        ArrayList<String> results_compare = code.compareResults(); //Se comparan los resultados
        results.setComparison(results_compare);
        System.out.println(results);
        results.setSolution(solution);
        solution.addResult(results);
        this.resultsRepository.save(results);

        //Se aumenta el valor del numero de exitosos o fallidos segun corresponda.
        if(code.isCorrect()){
            solution.addSucc();
        }else{
            solution.addFails();
        }


        //Se genera un objeto para retornar al front.
        Map<String,Object> return_to_front = new HashMap<String,Object>();
        return_to_front.put("results",results);
        return_to_front.put("comparison",results_compare);
        System.out.println(return_to_front);




        return return_to_front;
    }


    @CrossOrigin
    @RequestMapping(value = "/{id_solution}/getLog")
    @ResponseBody
    public List<Results> getResults(@PathVariable Long id){
        return this.solutionRepository.findSolutionById(id).getResults();
    }






}
