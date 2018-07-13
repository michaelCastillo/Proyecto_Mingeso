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

import java.lang.reflect.Array;
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
        //Solution
        Long id_solution = Long.parseLong(jsonIn.get("id_solution").toString());
        Solution solution = this.solutionRepository.findSolutionById(id_solution);
        //Problem
        Problem problem = solution.getProblem();

        //SolutionLog
        //time
        int time = Integer.parseInt(jsonIn.get("time").toString());
        solution.setTime(time);
        //Code

        String codeFromFront = jsonIn.get("code").toString();
        Results results = null;

        List<Results> old_results = solution.getResults();
        for(Results res: old_results){
            if(res.getCode().compareTo(codeFromFront) == 0){
                results = res;
                break;
            }
        }

        if(results == null){
            System.out.println("results es nulo, no hay codigo repetido");
            Code code = execute(codeFromFront,problem,solution);
            ArrayList<String> results_compare = code.compareResults(); //Se comparan los resultados
            results= code.getResults();
            results.setCode(code.getCode());
            //Se almacenan los resultados obtenidos de la ejecución.
            //Se comparan los resultados.

            results.setComparison(results_compare);
            System.out.println(results);
            results.setSolution(solution);
            solution.addResult(results);
            //Se guarda el codigo de la solución.
            this.resultsRepository.save(results);

            //Se genera un objeto para retornar al front.
            Map<String,Object> return_to_front = new HashMap<String,Object>();
            return_to_front.put("time",time);

            return_to_front.put("solution",solution);
            return_to_front.put("results",results);
            return_to_front.put("comparison",results_compare);
            System.out.println(return_to_front);
            this.solutionRepository.save(solution);
            return return_to_front;
        }else{
            System.out.println("El codigo ya existe");
            //Se cambian ciertos parametros de solution con los actuales
            //El codigo ya existe por lo tanto solo se actualiza su fecha.
            results.setTimestamp(new Date());
            this.resultsRepository.save(results);

            //Se genera un objeto para retornar al front.
            Map<String,Object> return_to_front = new HashMap<String,Object>();
            return_to_front.put("time",time);
            return_to_front.put("solution",solution);
            return_to_front.put("results",results);
            return_to_front.put("comparison",results.getComparison());
            System.out.println(return_to_front);
            this.solutionRepository.save(solution);
            return return_to_front;
        }
    }

    private Code execute(String code_in, Problem problem, Solution solution){
        System.out.println("EXECUTE! ");
        System.out.println("Problem: "+problem.getReturns().get(0));
        ArrayList<String> params = problem.getParameters();
        ArrayList<String> returns = problem.getReturns();
        Code code = new Code(code_in,params);
        code.setLanguage(problem.getLanguage());
        code.setO_outputs(returns);
        //Se ejecuta el codigo
        code.exec();
        code.compareResults();
        //Si esta correcto
        boolean isCorrect ;
        //Se aumenta el valor del numero de exitosos o fallidos segun corresponda.
        if(isCorrect = code.isCorrect()){
            System.out.println("Es correcto");
            solution.addSucc();
            solution.setSuccess(true);
            this.solutionRepository.save(solution);

        }else{
            System.out.println("Es incorrecto");
            solution.addFails();
            solution.setSuccess(false);
            this.solutionRepository.save(solution);
        }
        solution.setCode(code.getCode());

        return code;
    }



    @CrossOrigin
    @RequestMapping(value = "/save",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> saveSolution(@RequestBody Map<String,String> jsonIn){
        Map<String,String> response = new HashMap<>();
        try{

            Long idSol = Long.parseLong(jsonIn.get("id_solution"));
            Solution solution = this.solutionRepository.findSolutionById(idSol);
            if(solution.getSuccess()){
                solution.setClosed(true);
                this.solutionRepository.save(solution);
                response.put("status","closed");
                System.out.println("Cerrada");
            }else{
                //No hay cambios y la solucion aun no se cierra.
                response.put("status","not success, not closed");
                System.out.println("No cerrada");
            }

        }catch (Exception error){
            response.put("status",error.toString());
        }
        return response;
    }



    @CrossOrigin
    @RequestMapping(value = "/{id_solution}/getLog",method = RequestMethod.GET)
    @ResponseBody
    public List<Results> getResults(@PathVariable Long id){
        return this.solutionRepository.findSolutionById(id).getResults();
    }

    @CrossOrigin
    @RequestMapping(value = "/deleteAll",method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteAll(){
        this.solutionRepository.deleteAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/getTime")
    @ResponseBody
    public int getTime(@PathVariable Long id){
        return this.solutionRepository.findSolutionById(id).getTime();
    }

    @CrossOrigin
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    @ResponseBody
    public void test(){
        System.out.println("Test!");
    }








}
