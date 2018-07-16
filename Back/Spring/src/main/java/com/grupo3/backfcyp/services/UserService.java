package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.*;
import com.grupo3.backfcyp.models.Class;
import com.grupo3.backfcyp.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/users")
public class UserService {

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
            response.put("status",101); //el mail del usuario ya existe
            response.put("user",null);
            return response;
        }
        if(this.userRepository.findUserByName(user.getName())!=null){
            response.put("status",102); //el nombre del usuario ya existe
            response.put("user",null);
            return response;
        }
        if((roleList = user.getRoles()).isEmpty()) {
            response.put("status","El usuario no tiene roles seleccionados, vuelva a registrar uno valido");
            response.put("user",null);
            return response;
        }
        boolean roles[] = new boolean[4];roles[0]=false;roles[1]=false;roles[2]=false;roles[3]=false;
        int i = 0;
        for(Role role: roleList){
            if(role.getRole().compareTo("su") ==0) roles[0] = true;
            else if(role.getRole().compareTo("coordination") ==0) roles[1] = true;
            else if(role.getRole().compareTo("teacher") ==0) roles[2] = true;
            else if(role.getRole().compareTo("student") ==0) roles[3] = true;
            i++;
            this.roleRepository.findRoleByRole(role.getRole()).getUsers().add(user);
        }
        //Si es coordinador
        if(roles[1]) {
            System.out.println("Soy coordinador");
            List<Coordination> coordinations = user.getCoordCoordinations();
            for(Coordination coordination: coordinations){
                //Se establece el usuario que lidera esta coordinación.
                this.coordinationRepository.findSectionById(coordination.getId()).setCoordinator(user);
            }
        }
        //Si es profesor
        if(roles[2]){
            System.out.println("Soy profesor");
            List<Class> classes = user.getClasses_teachers();
            for(Class teacherClass: classes){
                this.classRepository.findClassById(teacherClass.getId()).getTeachers().add(user);
            }
            //this.classRepository.saveAll(classes);
        }
        //Si es estudiante
        if(roles[3]){
            System.out.println("Soy alumno");
            List<Career> careers = user.getCareers();
            for(Career career: careers){
                this.careerRepository.findCareerById(career.getId()).getUsers().add(user);
            }
            //this.careerRepository.saveAll(careers);
            List<Class> classes = user.getClasses_students();
            for(Class studentClass: classes){
                this.classRepository.findClassById(studentClass.getId()).getStudents().add(user);
            }
            //this.classRepository.saveAll(classes);
        }
        this.userRepository.save(user);
        response.put("status","Usuario agregado correctamente a la base de datos");
        response.put("user",user);
        return response;

//        if(!(roleList = user.getRoles()).isEmpty()){
//            for(Role role: roleList){
//                Role role_exist = roleRepository.findRoleByRole(role.getRole());
//                if(role_exist != null){//Si el rol existe
//                    role_exist.getUsers().add(user);
//                }
//            }
//        }
//        List<Coordination> coordinationList;
//        if((coordinationList =  user.getCoordinations() ) != null){
//            for(Coordination coordination : coordinationList){
//                Coordination coordination_exist = this.sectionRepository.findSectionByCode(coordination.getCode());
//                if(coordination_exist != null){
//                    coordination_exist.getUsers().add(user);
//                }
//            }
//        }
//        return this.userRepository.save(user);
    }


    @CrossOrigin
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> login(@RequestBody User user){
        Map<String,String> user_data = new HashMap<String,String>();
        System.out.println("Usuario:   " + user.getEmail() + "  " + user.getPassword());
        Map<String,Object> response = new HashMap<String,Object>();
        User userFronRepo = this.userRepository.findUserByEmailAndPasswordIgnoreCase(user.getEmail(),user.getPassword().toString());
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





}
