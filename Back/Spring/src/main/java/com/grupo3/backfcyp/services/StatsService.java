package com.grupo3.backfcyp.services;

import com.grupo3.backfcyp.models.Career;
import com.grupo3.backfcyp.models.Class;
import com.grupo3.backfcyp.models.Coordination;
import com.grupo3.backfcyp.models.Solution;
import com.grupo3.backfcyp.models.User;
import com.grupo3.backfcyp.repositories.CareerRepository;
import com.grupo3.backfcyp.repositories.ClassRepository;
import com.grupo3.backfcyp.repositories.CoordinationRepository;
import com.grupo3.backfcyp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
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
    @Autowired
    private CoordinationRepository coordinationRepository;
    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private UserRepository userRepository;


    @CrossOrigin
    @RequestMapping(value = "/users/{id}/totalTime")
    @ResponseBody
    public Map<String,Object> getTimeByUser(@PathVariable Long id){
        Map<String,Object> response = new HashMap<>();
        User student = this.userRepository.findUserById(id);
        Long totalTime = new Long(0);
        if(student != null){
            List<Solution> solutions = student.getSolutions();
            for(Solution solution: solutions){
                totalTime += solution.getTime();
            }
            response.put("status",200);
            response.put("message","Tiempo calculado correctamente");
            response.put("time",totalTime);
        }else{
            response.put("status",204);
            response.put("message","No hay un estudiante asociado a la id");
            response.put("time",0);
        }
        return response;
        
    }


    @CrossOrigin
    @RequestMapping(value = "/classes/{id}/totalTime")
    @ResponseBody
    public Map<String,Object> getTimeByClass(@PathVariable Long id){
        Map<String,Object> response = new HashMap<>();
        Class classToStat = this.classRepository.findClassById(id);
        Long totalTime = new Long(0);
        if(classToStat != null){
            List<User> students = classToStat.getStudents();
            if(students != null){
                for(User student: students){
                    List<Solution> solutions = student.getSolutions();
                    for(Solution solution: solutions){
                        totalTime += solution.getTime();
                    }
                }
                response.put("status",200);
                response.put("message","Tiempo total calculado correctamente");
                response.put("time",totalTime);
            }else{
                response.put("status",204);
                response.put("message","No se encuentran estudiantes asociados a la clase");
                response.put("time",0);
            }

        }else{
            response.put("status",204);
            response.put("message","No se encuentra clase asociada a la id");
            response.put("time",0);
        }
        return response;
    }

    @CrossOrigin
    @RequestMapping(value = "/coordination/{id}/totalTime")
    @ResponseBody
    public Map<String,Object> getTimeByCoordination(@PathVariable Long id){
        Coordination coordination = coordinationRepository.findCoordinationById(id);
        Map<String,Object> response = new HashMap<>();
        Long totalTime = new Long(0);
        if(coordination != null){
            List<Class> classes = coordination.getClasses();
            if(!classes.isEmpty()){
                ArrayList<User> students = new ArrayList<>();
                for(Class classWithStudents: classes){

                    for(User student : classWithStudents.getStudents()){
                        System.out.println("usuario: "+student.getName());
                        if(!students.contains(student)){
                            List<Solution> solutions = student.getSolutions();
                            for(Solution sol: solutions){
                                totalTime += sol.getTime();
                            }
                        }
                    }
                    students.addAll(classWithStudents.getStudents());//Se agregan los usuarios.
                }
                response.put("status",200);
                response.put("messsage","Tiempo calculado correctamente");
                response.put("time",totalTime);
            }else{
                response.put("status",204);
                response.put("message","No hay clases asociadas a la coordinación");
                response.put("time",0);
            }
        }else{
            response.put("time",0);
            response.put("message","No existe una coordinacion asociada a dicha id.");
            response.put("status",204);
        }
        return response;

    }

    @CrossOrigin
    @RequestMapping(value = "/career/{id}/totalTime",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getTimeByCareer(@PathVariable Long id){
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
