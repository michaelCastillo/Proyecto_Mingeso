package com.grupo3.backfcyp.services;

import com.google.gson.JsonObject;
import com.grupo3.backfcyp.models.Problem;
import com.grupo3.backfcyp.models.Solution;
import com.grupo3.backfcyp.models.SolutionLog;
import com.grupo3.backfcyp.models.User;
import com.grupo3.backfcyp.repositories.ProblemRepository;
import com.grupo3.backfcyp.repositories.SolutionLongRepository;
import com.grupo3.backfcyp.repositories.SolutionRepository;
import com.grupo3.backfcyp.repositories.UserRepository;
import com.grupo3.backfcyp.strategy.Code;
import com.grupo3.backfcyp.strategy.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

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
    private SolutionLongRepository solutionLongRepository;


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
    public Results executeCode(@RequestBody Map<String,Object> jsonIn){
        System.out.println(jsonIn);
        Long id_solution = Long.parseLong(jsonIn.get("id_solution").toString());
        Solution solution = this.solutionRepository.findSolutionById(id_solution);
        List<SolutionLog> solutionLogs = solution.getSolutionLogs();
        SolutionLog newSolutionLog = new SolutionLog();

        //Ejecuto el codigo
        Code code = new Code();
        code.setCode(jsonIn.get("code").toString());
        //code.setO_inputs(jsonIn.get("o_outputs"));
        ArrayList<Date> dates = new ArrayList<>();
        Date currentDate = new Date();
        int actualVal = currentDate.compareTo(solutionLogs.get(0).getDate());
        SolutionLog lastSolLog;
        for(SolutionLog solutionLog: solutionLogs){
            if(currentDate.compareTo(solutionLog.getDate()) < actualVal ){
                System.out.println("Es menor");
                lastSolLog = solutionLog;
                actualVal = currentDate.compareTo(solutionLog.getDate());
            }
        }


        return null;
    }






}
