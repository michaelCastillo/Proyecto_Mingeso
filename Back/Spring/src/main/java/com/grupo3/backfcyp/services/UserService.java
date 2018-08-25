package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.*;
import com.grupo3.backfcyp.models.Class;
import com.grupo3.backfcyp.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/users")
public class UserService {
    private static final String STATUS = "status";

    @Autowired
    public UserRepository userRepository;
    @Autowired
    public RoleRepository roleRepository;
    @Autowired
    public CoordinationRepository coordinationRepository;
    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private CareerRepository careerRepository;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<User> getUsers(){
        return this.userRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/simple",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getUsersSimplified(){

        Map<String,Object> response = new HashMap<>();
        //Obtener osuarios por carrera
        List<Career> careers = this.careerRepository.findAll();

        List<Map<String,Object>> careersToResponse = new ArrayList<>();
        for(Career career: careers){
            Map<String,Object> careerWithUsers = new HashMap<>();
            careerWithUsers.put("id",career.getId());
            careerWithUsers.put("name",career.getName());
            careerWithUsers.put("students_career",career.getUsers());
            careersToResponse.add(careerWithUsers);
        }

        List<Map<String,Object>> coordinationsToResponse = new ArrayList<>();
        List<Coordination> coordinations = this.coordinationRepository.findAll();
        for(Coordination coord: coordinations){
            Map<String,Object> coordWithClasses = new HashMap<>();
            coordWithClasses.put("id",coord.getId());
            coordWithClasses.put("code",coord.getCode());

            List<Class> classes = coord.getClasses();
            List<Map<String,Object>> classesWithStudents = new ArrayList<>();
            for(Class class_: classes){
                Map<String,Object>  classObj = new HashMap<>();
                classObj.put("id",class_.getId());
                classObj.put("code",class_.getCode());

                List<User> users = class_.getStudents() ;

                classObj.put("students",users);
                classesWithStudents.add(classObj);
            }
            coordWithClasses.put("classes",classesWithStudents);
            coordinationsToResponse.add(coordWithClasses);

        }
        response.put("careers",careersToResponse);
        response.put("coordinations",coordinationsToResponse);


        return response;

    }


    
    @CrossOrigin
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public User getUserById(@PathVariable Long id){
        return this.userRepository.findUserById(id);   
    }
    
    
    @CrossOrigin
    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    @ResponseBody
    public User updateUser(@Valid @RequestBody User user){
        return this.userRepository.save(user);
    }

    @CrossOrigin
    @RequestMapping(value = "/getByRoles", method = RequestMethod.POST)
    @ResponseBody
    public List<User> getUsersByRole(@RequestBody @Valid Role role){
        return this.roleRepository.findRoleByRole(role.getRole()).getUsers();
    }




    //Creacion de un usuario de cualquier tipo a partir de roles ya creados.
    @CrossOrigin
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> createUser(@Valid @RequestBody User user){
        List<Role> roleList;
        Map<String,Object> response = new HashMap<>();

        if(this.userRepository.findUserByEmail(user.getEmail()) != null){
            response.put(STATUS,101); //el mail del usuario ya existe
            response.put("user",null);
            return response;
        }
        if(this.userRepository.findUserByName(user.getName())!=null){
            response.put(STATUS,102); //el nombre del usuario ya existe
            response.put("user",null);
            return response;
        }
        /* desde el front debe elegir si o si un rol*/
        roleList = user.getRoles();
        if(roleList.isEmpty()) {
            response.put(STATUS,"El usuario no tiene roles seleccionados, vuelva a registrar uno valido");
            response.put("user",null);
            return response;
        }
        boolean[] roles = new boolean[4];roles[0]=false;roles[1]=false;roles[2]=false;roles[3]=false;
        for(Role role: roleList){
            if(role.getRole().compareTo("su") ==0) roles[0] = true;
            else if(role.getRole().compareTo("coordination") ==0) roles[1] = true;
            else if(role.getRole().compareTo("teacher") ==0) roles[2] = true;
            else if(role.getRole().compareTo("student") ==0) roles[3] = true;
            this.roleRepository.findRoleByRole(role.getRole()).getUsers().add(user);
        }
        //Si es coordinador
        if(roles[1]) {
            List<Coordination> coordinations = user.getCoordCoordinations();
            if(coordinations != null){
                for(Coordination coordination: coordinations){
                    //Se establece el usuario que lidera esta coordinación.
                    this.coordinationRepository.findCoordinationById(coordination.getId()).setCoordinator(user);
                }
            }
        }
        //Si es profesor
        if(roles[2]){
            List<Class> classes = user.getClasses_teachers();
            if(classes != null){
                for(Class teacherClass: classes){
                    this.classRepository.findClassById(teacherClass.getId()).getTeachers().add(user);
                }
            }

        }
        //Si es estudiante
        if(roles[3]){
            if(user.getCareers() != null){
                List<Career> careers = user.getCareers();
                for(Career career: careers){
                    this.careerRepository.findCareerById(career.getId()).getUsers().add(user);
                }
            }
            if(user.getClasses_students() != null){
                List<Class> classes = user.getClasses_students();
                for(Class studentClass: classes){
                    this.classRepository.findClassById(studentClass.getId()).getStudents().add(user);
                }
            }
        }
        this.userRepository.save(user);
        response.put(STATUS,"Usuario agregado correctamente a la base de datos");
        response.put("user",user);
        return response;


    }


    @CrossOrigin
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> login(@RequestBody User user){
        Map<String,String> user_data = new HashMap<String,String>();
        System.out.println("Usuario:   " + user.getEmail() + "  " + user.getPassword());
        Map<String,Object> response = new HashMap<String,Object>();
        User userFronRepo = this.userRepository.findUserByEmailAndPasswordIgnoreCase(user.getEmail(),user.getPassword());
        if(userFronRepo != null){
            user_data.put("logged","in");
            user_data.put("id",userFronRepo.getId().toString());
            user_data.put("name",userFronRepo.getName());
            user_data.put("email",userFronRepo.getEmail());
            response.put("user",user_data);
            response.put("roles",userFronRepo.getRoles());
        }else{
            user_data.put("logged","out");
            user_data.put("id","");
            user_data.put("name","");
            user_data.put("email","");
            response.put("user",user_data);
            response.put("roles",null);
        }
        return response;
    }



    @CrossOrigin
    @RequestMapping(value = "/student/{id}/getAllProblems",method = RequestMethod.GET)
    @ResponseBody
    public List<Problem> getSolutionsByStudent(@PathVariable Long id){
        List<Problem> problems = new ArrayList<>();
        User student = this.userRepository.findUserById(id);
        List<Solution> solutions = student.getSolutions();
        for(Solution solution: solutions){
            problems.add(solution.getProblem());
        }
        return problems;
    }

    @CrossOrigin
    @RequestMapping(value = "/student/{id}/getSolvedProblems",method = RequestMethod.GET)
    @ResponseBody
    public List<Problem> getUnsolvedSolutions (@PathVariable Long id){
        User student = this.userRepository.findUserById(id);
        List<Problem> problems = new ArrayList<>();
        for(Solution sol: student.getSolutions()){
            if(sol.isSuccess()){
                problems.add(sol.getProblem());
            }
        }
        return problems;
    }





}
