package com.grupo3.backfcyp.services;

import com.grupo3.backfcyp.models.Class;
import com.grupo3.backfcyp.models.Coordination;
import com.grupo3.backfcyp.models.Role;
import com.grupo3.backfcyp.models.User;
import com.grupo3.backfcyp.repositories.ClassRepository;
import com.grupo3.backfcyp.repositories.CoordinationRepository;
import com.grupo3.backfcyp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/coordinations")
public class CoordinationService {

    @Autowired
    private CoordinationRepository coordinationRepository;
    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Coordination> getSections() {
        return this.coordinationRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Coordination getSectionById(@PathVariable Long id) {
        return this.coordinationRepository.findCoordinationById(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/getClasses", method = RequestMethod.GET)
    @ResponseBody
    public List<Class> getClassesFromCoord(@PathVariable Long id) {
        return (this.coordinationRepository.findCoordinationById(id)).getClasses();
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/classes", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getClasses(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        if (this.coordinationRepository.findCoordinationById(id) != null) {
            response.put("classes", this.coordinationRepository.findCoordinationById(id).getClasses());
            response.put("status", "have classes");
        } else {
            response.put("classes", null);
            response.put("status", "coordination doesn't exist");
        }
        return response;
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Coordination createSection(@Valid @RequestBody Coordination coordination) {
        List<Class> classes = coordination.getClasses();
        if ((classes != null) && (!classes.isEmpty())) {
            for (Class classs : classes) {
                this.classRepository.findClassById(classs.getId()).setCoordination(coordination);
            }
        }
        return this.coordinationRepository.save(coordination);
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/setClasses", method = RequestMethod.PUT)
    @ResponseBody
    public Map<String, Object> addClasses(@PathVariable Long id, @RequestBody List<Class> classes) {
        Map<String, Object> response = new HashMap<>();
        Coordination coordination = this.coordinationRepository.findCoordinationById(id);
        if (coordination != null) {
            for (Class classNew : classes) {
                coordination.getClasses().add(classNew);
                this.classRepository.findClassById(classNew.getId()).setCoordination(coordination);
            }
            response.put("status", "coordination exist");
            response.put("coordination", this.coordinationRepository.save(coordination));

            return response;
        } else {
            response.put("status", "coordination doesn't exist");
            response.put("coordination", coordination);
            return response;
        }

    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/setCoordinator", method = RequestMethod.PUT)
    @ResponseBody
    public Map<String, Object> setCoordinator(@PathVariable Long id, @RequestBody User user) {
        Coordination coordination = this.coordinationRepository.findCoordinationById(id);
        User user1 = this.userRepository.findUserById(user.getId());
        Map<String, Object> response = new HashMap<>();

        if ((coordination != null) && (user1 != null)) {
            boolean isCoord = false;
            for (Role role : user1.getRoles()) {
                if (role.getRole().compareTo("coordination") == 0) {
                    isCoord = true;
                    break;
                }
            }
            if (isCoord) {
                coordination.setCoordinator(user1);
                user1.getCoordCoordinations().add(coordination);
                response.put("status", "coordinator added");
                response.put("coordinator", coordination);
                return response;
            } else {
                response.put("status", "user have not the permission");
                response.put("coordinator", coordination);
                return response;
            }

        } else {
            response.put("status", "the user|coordination doesn't exist");
            response.put("status", coordination);
            return response;
        }

    }

}
