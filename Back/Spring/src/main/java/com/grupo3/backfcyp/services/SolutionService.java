package com.grupo3.backfcyp.services;

import com.google.gson.JsonObject;
import com.grupo3.backfcyp.models.*;
import com.grupo3.backfcyp.models.mongoModels.Code;
import com.grupo3.backfcyp.repositories.*;
import com.grupo3.backfcyp.repositories.mongoRepos.CodeRepository;

import com.grupo3.backfcyp.strategy.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "/solutions")
public class SolutionService {
    private static final String CLOSED = "closed";
    private static final String SOLUTION = "solution";
    private static final String STATUS = "status";

    @Autowired
    public SolutionRepository solutionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private ResultsRepository resultsRepository;
    @Autowired
    private CodeRepository codeRepository;
    @Autowired
    private TestRepository testRepository;


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
            return solution;
        }else{
            return null;
        }
    }


    /*Create */
    @CrossOrigin
    @RequestMapping(value = "/create",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> createSolution(@RequestBody Map<String,Object> jsonIn){

        User student = this.userRepository.findUserById(Long.parseLong(jsonIn.get("id_user").toString()));
        Problem problem = this.problemRepository.findProblemById(Long.parseLong(jsonIn.get("id_problem").toString()));
        Solution solutionFromRepo = this.solutionRepository.findSolutionByStudentAndProblem(student,problem);
        Map<String,Object> response = new HashMap<>();
        if(solutionFromRepo == null) {



            Solution solution = new Solution();
            solution.setStudent(student);
            solution.setProblem(problem);
            solution.setTitle(jsonIn.get("title").toString());
            solution.setErrors(jsonIn.get("errors").toString());
            solution.setClosed((boolean) jsonIn.get(CLOSED));
            solution.setSuccess((boolean) jsonIn.get("success"));
            solution.setSuccesses(Integer.parseInt(jsonIn.get("successes").toString()));
            solution.setFails(0);
            solution.setTime(0);
            //Se setea la fecha de hoy.
            Date today = new Date();
            solution.setTimestamp(today);
            response.put("code",solution.codeGet(codeRepository));
            response.put(SOLUTION,this.solutionRepository.save(solution));
            return response;
        }else{
            response.put(SOLUTION,solutionFromRepo);
            response.put("code",solutionFromRepo.codeGet(codeRepository));
            return response;
        }

    }



    @CrossOrigin
    @RequestMapping(value = "/execute",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> executeCode(@RequestBody Map<String,Object> jsonIn){
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


        String codeFromFront = jsonIn.get("code").toString();
        Test testToFront = null;

        List<Test> old_results = solution.testsGet();
        //Si el codigo ya existe se entrega el test.
        for(Test test_old: old_results){
            if(test_old.getCode(codeRepository).compareTo(codeFromFront) == 0){
                testToFront = test_old;
                break;
            }
        }

        Code code = new Code();
        code.setCode(codeFromFront);
        code = this.codeRepository.save(code);

        if(testToFront == null){
            testToFront = execute(code.getId(),problem,solution);
            testToFront.setSolution(solution);
            testToFront.codeIdSet(code.getId());
            testToFront.setTime(time);//Se añade el tiempo parcial.
            //Se almacena el test.

            //Se genera un objeto para retornar al front.
            Map<String,Object> return_to_front = new HashMap<String,Object>();
            return_to_front.put("time",time);
            return_to_front.put(SOLUTION,solution);
            return_to_front.put("code",codeFromFront);
            solution.testsGet().add(testToFront);
            this.solutionRepository.save(solution);
            return return_to_front;
        }else{
            //Se cambian ciertos parametros de solution con los actuales
            //El codigo ya existe por lo tanto solo se actualiza su fecha.
            testToFront.setCreated(new Date());

            testToFront.setTime(time);
            this.testRepository.save(testToFront);
            solution.setSuccess(testToFront.isCorrect());
            //Se genera un objeto para retornar al front.
            Map<String,Object> return_to_front = new HashMap<String,Object>();
            return_to_front.put("time",time);
            return_to_front.put(SOLUTION,solution);
            return_to_front.put("code",codeFromFront);
            this.solutionRepository.save(solution);
            return return_to_front;
        }
    }

    private Test execute(String codeId, Problem problem, Solution solution){
        List<String> paramsAux = problem.getParameters();
        List<String> returnsAux = problem.getReturns_string();
        ArrayList<String> params = new ArrayList<String>(paramsAux);
        ArrayList<String> returns = new ArrayList<String>(returnsAux);
        Test test = new Test();
        test.codeIdSet(codeId);
        test.setSolution(solution);
        test.setLanguage(problem.getLanguage());
        //Se ejecuta el codigo
        test.exec(params,codeRepository);
        //Se realizan las comparaciones .
        test.compareResults(returns);
        this.testRepository.save(test);
        this.resultsRepository.saveAll(test.getResults()); //Se guardan los resultados.
        //Si esta correcto
        //Se aumenta el valor del numero de exitosos o fallidos segun corresponda.
        if(test.isCorrect()){
            solution.addSucc();
            solution.setSuccess(true);

        }else{
            solution.addFails();
            solution.setSuccess(false);
        }
        return test;
    }



    @CrossOrigin
    @RequestMapping(value = "/save",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> saveSolution(@RequestBody Map<String,String> jsonIn){
        Map<String,Object> response = new HashMap<>();
        try{
            Long idSol = Long.parseLong(jsonIn.get("id_solution"));
            Solution solution = this.solutionRepository.findSolutionById(idSol);
            if(solution.isSuccess()){
                solution.setClosed(true);
                solution.setSolvedDate(new Date());
                this.solutionRepository.save(solution);
                response.put(STATUS,CLOSED);
                response.put(CLOSED,true);
            }else{
                //No hay cambios y la solucion aun no se cierra.
                response.put(STATUS,"not success, not closed");
                response.put(CLOSED,false);
            }

        }catch (Exception error){
            response.put(STATUS,error.toString());
        }
        return response;
    }



    @CrossOrigin
    @RequestMapping(value = "/{id_solution}/getLog",method = RequestMethod.GET)
    @ResponseBody
    public List<Test> getResults(@PathVariable Long id){
        return this.solutionRepository.findSolutionById(id).testsGet();
    }

    @CrossOrigin
    @RequestMapping(value = "/all",method = RequestMethod.DELETE)
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
    }








}
