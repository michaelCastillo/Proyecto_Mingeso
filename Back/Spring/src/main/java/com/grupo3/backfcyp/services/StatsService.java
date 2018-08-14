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
    private static final String STATUS = "status";
    private static final String MESSAGE = "message";
    private static final String YYYYMMDD = "yyyy-MM-dd";
    private static final String DATELIMIT = "dateLimit";
    private static final String RESULT = "result";
    private static final String TIME = "time";
    private static final String NUMBERSOLVED = "numberSolved";
    private static final String TIMETRUE = "Tiempo calculado correctamente";
    private static final String TIMEFALSE = "No hay un estudiante asociado a la id";

    @Autowired
    private CareerRepository careerRepository;
    @Autowired
    private CoordinationRepository coordinationRepository;
    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private UserRepository userRepository;


    /*** Estadisticas de tiempo total invertido para resolver un problema. ***/
    private Map<String,Object> responseInit(String status, Object o1, String response, Object o2, String message, Object o3 ){
        Map<String,Object> response = new HashMap<>();
        response.put(status, o1);
        response.put(response, o2);
        response.put(message, o3);
        return response;

    }

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
            response = responseInit(STATUS, 200, MESSAGE, TIMETRUE, TIME, totalTime);
            
        }else{
            response = responseInit(STATUS, 204, MESSAGE, TIMEFALSE, TIME, 0);
           
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
                response = responseInit(STATUS, 200, MESSAGE, TIMETRUE, TIME, totalTime);
                
            }else{
                response = responseInit(STATUS, 204, MESSAGE, TIMEFALSE, TIME, 0);

            }

        }else{
            response = responseInit(STATUS, 204, MESSAGE, TIMEFALSE, TIME, 0);
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
                        if(!students.contains(student)){
                            List<Solution> solutions = student.getSolutions();
                            for(Solution sol: solutions){
                                totalTime += sol.getTime();
                            }
                        }
                    }
                    students.addAll(classWithStudents.getStudents());//Se agregan los usuarios.
                }
                response = responseInit(STATUS, 200, MESSAGE, TIMETRUE, TIME, totalTime);
                
            }else{
                response = responseInit(STATUS, 204, MESSAGE, "No hay clases asociadas a la coordinación", TIME, 0);
                
            }
        }else{
            response = responseInit(STATUS, 204, MESSAGE, "No existe una coordinacion asociada a dicha id.", TIME, 0);

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
            response = responseInit(STATUS, 200, MESSAGE, "Solicitud aceptada, se entrega el tiempo total", TIME, totalTime);
        }else{
            response = responseInit(STATUS, 204, MESSAGE, "La carrera no tiene estudiantes.", TIME, totalTime);

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
            SimpleDateFormat formater = new SimpleDateFormat(YYYYMMDD);
            Date dateLimit = formater.parse(jsonIn.get(DATELIMIT).toString());
            solutions = sortDescAndFiltreByDate(solutions,dateLimit);
            List<Map<String,Object>> results = getNumberProblemsByDate(solutions);
            response = responseInit(STATUS, 200, MESSAGE, "Numero se soluciones calculadas correctamente", RESULT, results);
        }else{
            
            response = responseInit(STATUS, 204, MESSAGE, "No se encuentran soluciones en las que haya trabajado el estudiante", RESULT, null);
        }
        return response;
    }

    @CrossOrigin
    @RequestMapping(value = "/coordinations/{id}/problemsSolved")
    @ResponseBody
    public Map<String,Object> getNumberProblemsByCoordination(@PathVariable Long id, @RequestBody Map<String,Object> jsonIn) throws ParseException {
        Coordination coordination = this.coordinationRepository.findCoordinationById(id);
        Map<String,Object> response = new HashMap<>();
        SimpleDateFormat formater = new SimpleDateFormat(YYYYMMDD);
        Date dateLimit = formater.parse(jsonIn.get(DATELIMIT).toString());
        if(coordination != null){
            List<Class> classes = coordination.getClasses();
            if(classes != null){
                List<User> students = new ArrayList<>();
                for(Class classToStat: classes){
                    students.addAll(classToStat.getStudents());
                }
                response = getResult(students,dateLimit);
            }else{
                response = responseInit(STATUS, 204, MESSAGE, "No hay clases asociadas a la coordinación", RESULT, null);

            }
        }else{
            response = responseInit(STATUS, 204, MESSAGE, "No existe una coordinacion asociada a dicha id.", RESULT, null);

        }
        return response;
    }

    @CrossOrigin
    @RequestMapping(value = "/careers/{id}/problemsSolved",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getNumberProblemsByCareer(@PathVariable Long id, @RequestBody Map<String,Object> jsonIn) throws ParseException {

        Career career = this.careerRepository.findCareerById(id);
        Map<String,Object> response = new HashMap<>();
        SimpleDateFormat formater = new SimpleDateFormat(YYYYMMDD);
        Date dateLimit = formater.parse(jsonIn.get(DATELIMIT).toString());
        if(career != null){
            List<User> students = career.getUsers();
            response = getResult(students,dateLimit);
        }else{
            response = responseInit(STATUS, 204, MESSAGE, "No existe clase asociada a la id", RESULT, null);
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
            response = responseInit(STATUS, 200, MESSAGE, "Numero se soluciones calculadas correctamente", RESULT, results);
            
            
        }else{
            response = responseInit(STATUS, 204, MESSAGE, "No hay estudiantes asignados.", RESULT, null);

        }
        return response;
    }



    @CrossOrigin
    @RequestMapping(value = "/classes/{id}/problemsSolved",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getNumberProblemsByClass(@PathVariable Long id, @RequestBody Map<String,Object> jsonIn) throws ParseException {
        Class classToStats = this.classRepository.findClassById(id);
        Map<String,Object> response = new HashMap<>();
        SimpleDateFormat formater = new SimpleDateFormat(YYYYMMDD);
        Date dateLimit = formater.parse(jsonIn.get(DATELIMIT).toString());
        if(classToStats != null){
            List<User> students = classToStats.getStudents();
            response = getResult(students,dateLimit);
        }else{
            response = responseInit(STATUS, 204, MESSAGE, "No existe clase asociada a la id", RESULT, null);

        }
        return response;
    }


    private List<Map<String,Object>> getNumberProblemsByDate(List<Solution> solutions){
        List<Map<String,Object>> result = new ArrayList<>();
        if(!solutions.isEmpty()){

            //Se toma la primera para iniciar las comparaciones
            String dateLoop = new SimpleDateFormat(YYYYMMDD).format(solutions.get(0).getSolvedDate());
            int indexPointer = 0;
            int acum = 0;
            int x = 0;
            for(Solution solution: solutions){
                x++;
                String actualDateFormatted =  new SimpleDateFormat(YYYYMMDD).format(solution.getSolvedDate());
                if(actualDateFormatted.compareTo(dateLoop) == 0){//Son iguales
                    acum++;
                    if(x == solutions.size()){//Si llegamos al ultimo

                        result.add(new HashMap<>());
                        result.get(indexPointer).put("date",dateLoop);
                        result.get(indexPointer).put(NUMBERSOLVED,acum);
                    }
                }else{
                    //Se setean los valores anteriores
                    result.add(new HashMap<>());
                    result.get(indexPointer).put("date",dateLoop);
                    result.get(indexPointer).put(NUMBERSOLVED,acum);
                    dateLoop = actualDateFormatted;//Se cambia la fecha a la nueva.
                    indexPointer++; //Se cambia al siguiente valor del arreglo de respuesta.
                    acum = 1;
                    if(x == solutions.size()){//Si llegamos al ultimo

                        result.add(new HashMap<>());
                        result.get(indexPointer).put("date",dateLoop);
                        result.get(indexPointer).put(NUMBERSOLVED,acum);
                    }
                }
            }
            if(indexPointer == 0){ //Es decir que nunca hubo alguna de otra fecha.
                result.get(indexPointer).put("date",dateLoop);
                result.get(indexPointer).put(NUMBERSOLVED,acum);
            }
            return result;
        }
        return result;
    }

    private List<Solution> sortDescAndFiltreByDate(List<Solution> solutions, Date dateLimit) throws ParseException {
        List<Solution> solutionsFinished = new ArrayList<>();
        for(Solution solution: solutions){

            if(solution.getSolvedDate() != null) {
                solutionsFinished.add(solution);
            }
        }
        Collections.sort(solutionsFinished,new SolutionByDate());
        List<Solution> validSolutions = new ArrayList<>();

        SimpleDateFormat formater = new SimpleDateFormat(YYYYMMDD);
        for(Solution solution: solutionsFinished){
            //Es la primera aparicion de una solucion más antigua que el limite.
            String dateDays = formater.format(solution.getSolvedDate());
            Date actualDate = formater.parse(dateDays);
            if(dateLimit.compareTo(actualDate) <= 0){
                validSolutions.add(solution);
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


