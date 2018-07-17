package com.grupo3.backfcyp.services;

import com.grupo3.backfcyp.models.Career;
import com.grupo3.backfcyp.models.Solution;
import com.grupo3.backfcyp.models.User;
import com.grupo3.backfcyp.repositories.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/stats")
public class StatsService {


    @Autowired
    private CareerRepository careerRepository;


    @CrossOrigin
    @RequestMapping(value = "/career/{id}/totalTime",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getStatsByCareer(@PathVariable Long id){
        Map<String,Object> response = new HashMap<>();
        Career career = this.careerRepository.findCareerById(id);
        //Se toman los estudiantes
        List<User> students = career.getUsers();
        if(!students.isEmpty()){
            Long totalTime = new Long(0);
            for(User user: students){
                List<Solution> solutionsUser = user.getSolutions();
                for(Solution solution: solutionsUser){
                    //Se toman todas las soluciones, independiente si se repiten
                    totalTime += solution.getTime();
                }
            }
            response.put("status",200);
            response.put("message","Solicitud aceptada, se entrega el tiempo total");
            response.put("totalTime",totalTime);
        }else{
            response.put("status",204);
            response.put("message","La carrera no tiene estudiantes.");
            response.put("totalTime",0);
        }
        return response;
    }
}
