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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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


    /*** Estadisticas de tiempo total invertido para resolver un problema. ***/

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

    /*** Estadisticas del numero de problemas resueltos por dia ***/

    @CrossOrigin
    @RequestMapping(value = "/student/{id}/problemsSolved",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getProblemsSolvedByStudent(@PathVariable Long id, @RequestBody Map<String,Object> jsonIn) throws ParseException {
        Map<String,Object> response = new HashMap<>();
        User student = this.userRepository.findUserById(id);

        List<Solution> solutions = student.getSolutions();
        if(!solutions.isEmpty()){ //Si el estudiante tiene soluciones asociadas
            //Date dateTest = new Date(jsonIn.get("dateLimit"));
            SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
            Date dateLimit = formater.parse(jsonIn.get("dateLimit").toString());
            System.out.println("limite Sin formateo => "+dateLimit.toString());
            String dateLimitFormated = new SimpleDateFormat("yyyy-MM-dd").format(dateLimit);
            System.out.println("date limit => "+dateLimitFormated);
            solutions = sortDescAndFiltreByDate(solutions,dateLimit);
            List<Map<String,Object>> results = getNumberProblemsByDate(solutions);
            response.put("result",results);
            response.put("status",200);
            response.put("message","Numero se soluciones calculadas correctamente");
        }else{
            response.put("status",204);
            response.put("message","No se encuentran soluciones en las que haya trabajado el estudiante");
            response.put("result",null);
        }
        return response;
    }

    @CrossOrigin
    @RequestMapping(value = "/coordinations/{id}/problemsSolved")
    @ResponseBody
    public Map<String,Object> getNumberProblemsByCoordination(@PathVariable Long id, @RequestBody Map<String,Object> jsonIn) throws ParseException {
        Coordination coordination = this.coordinationRepository.findCoordinationById(id);
        Map<String,Object> response = new HashMap<>();
        SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
        Date dateLimit = formater.parse(jsonIn.get("dateLimit").toString());
        if(coordination != null){
            List<Class> classes = coordination.getClasses();
            if(classes != null){
                List<User> students = new ArrayList<>();
                for(Class classToStat: classes){
                    students.addAll(classToStat.getStudents());
                }
                response = getResult(students,dateLimit);
            }else{
                response.put("status",204);
                response.put("message","No existen clases asociada a la coordinacion");
                response.put("result",null);
            }
        }else{
            response.put("status",204);
            response.put("message","No existe coordination asociada a la id");
            response.put("result",null);
        }
        return response;
    }

    @CrossOrigin
    @RequestMapping(value = "/careers/{id}/problemsSolved",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getNumberProblemsByCareer(@PathVariable Long id, @RequestBody Map<String,Object> jsonIn) throws ParseException {

        Career career = this.careerRepository.findCareerById(id);
        Map<String,Object> response = new HashMap<>();
        List<Solution> solutions = new ArrayList<>();
        SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
        Date dateLimit = formater.parse(jsonIn.get("dateLimit").toString());
        if(career != null){
            List<User> students = career.getUsers();
            response = getResult(students,dateLimit);
        }else{
            response.put("status",204);
            response.put("message","No existe clase asociada a la id");
            response.put("result",null);
        }
        return response;
    }

    private Map<String,Object> getResult(List<User> students, Date dateLimit) throws ParseException {
        Map<String,Object> response = new HashMap<>();
        List<Solution> solutions = new ArrayList<>();

        if(students != null){
            for(User student: students){
                solutions.addAll(student.getSolutions());//Se obtienen las soluciones.
            }
            solutions = sortDescAndFiltreByDate(solutions,dateLimit);
            List<Map<String,Object>> results = getNumberProblemsByDate(solutions);
            response.put("result",results);
            response.put("status",200);
            response.put("message","Numero se soluciones calculadas correctamente");

        }else{
            response.put("status",204);
            response.put("message","No hay estudiantes asignados.");
            response.put("result",null);
        }
        return response;
    }



    @CrossOrigin
    @RequestMapping(value = "/classes/{id}/problemsSolved",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getNumberProblemsByClass(@PathVariable Long id, @RequestBody Map<String,Object> jsonIn) throws ParseException {
        Class classToStats = this.classRepository.findClassById(id);
        Map<String,Object> response = new HashMap<>();
        SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
        Date dateLimit = formater.parse(jsonIn.get("dateLimit").toString());
        if(classToStats != null){
            List<User> students = classToStats.getStudents();
            response = getResult(students,dateLimit);
        }else{
            response.put("status",204);
            response.put("message","No existe clase asociada a la id");
            response.put("result",null);
        }
        return response;
    }


    private List<Map<String,Object>> getNumberProblemsByDate(List<Solution> solutions){
        List<Map<String,Object>> result = new ArrayList<>();
        if(!solutions.isEmpty()){

            //Se toma la primera para iniciar las comparaciones
            String dateLoop = new SimpleDateFormat("yyyy-MM-dd").format(solutions.get(0).getSolvedDate());
            int indexPointer = 0;
            int acum = 0;
            int x = 0;
            System.out.println("solutions size => "+solutions.size());
            for(Solution solution: solutions){
                x++;
                String actualDateFormatted =  new SimpleDateFormat("yyyy-MM-dd").format(solution.getSolvedDate());
                if(actualDateFormatted.compareTo(dateLoop) == 0){//Son iguales
                    acum++;
                    if(x == solutions.size()){//Si llegamos al ultimo

                        result.add(new HashMap<>());
                        result.get(indexPointer).put("date",dateLoop);
                        result.get(indexPointer).put("numberSolved",acum);
                    }
                }else{
                    //Se setean los valores anteriores
                    result.add(new HashMap<>());
                    result.get(indexPointer).put("date",dateLoop);
                    result.get(indexPointer).put("numberSolved",acum);
                    dateLoop = actualDateFormatted;//Se cambia la fecha a la nueva.
                    indexPointer++; //Se cambia al siguiente valor del arreglo de respuesta.
                    acum = 1;
                    if(x == solutions.size()){//Si llegamos al ultimo

                        result.add(new HashMap<>());
                        result.get(indexPointer).put("date",dateLoop);
                        result.get(indexPointer).put("numberSolved",acum);
                    }
                }
            }
            if(indexPointer == 0){ //Es decir que nunca hubo alguna de otra fecha.
                result.get(indexPointer).put("date",dateLoop);
                result.get(indexPointer).put("numberSolved",acum);
            }
            return result;
        }
        return result;
    }

    private List<Solution> sortDescAndFiltreByDate(List<Solution> solutions, Date dateLimit) throws ParseException {
        List<Solution> solutionsFinished = new ArrayList<>();
        for(Solution solution: solutions){

            if(solution.getSolvedDate() != null) {
                System.out.println("solution id: "+solution.getId());
                System.out.println("date sin format => "+solution.getSolvedDate());
                System.out.println("fecha: "+new SimpleDateFormat("yyyy-MM-dd").format(solution.getSolvedDate()));
                solutionsFinished.add(solution);
            }
        }
        Collections.sort(solutionsFinished,new SolutionByDate());
        List<Solution> validSolutions = new ArrayList<>();

        SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
        for(Solution solution: solutionsFinished){
            //Es la primera aparicion de una solucion más antigua que el limite.
            String dateDays = formater.format(solution.getSolvedDate());
            Date actualDate = formater.parse(dateDays);
            if(dateLimit.compareTo(actualDate) <= 0){
                validSolutions.add(solution);
            }else{
                System.out.println(actualDate+" Es más antigua que "+dateLimit.toString());
            }
        }
        return validSolutions;
    }
}

class SolutionByDate implements Comparator<Solution> {

    @Override
    public int compare(Solution o1, Solution o2) {

        return -o1.getSolvedDate().compareTo(o2.getSolvedDate());

    }
}


