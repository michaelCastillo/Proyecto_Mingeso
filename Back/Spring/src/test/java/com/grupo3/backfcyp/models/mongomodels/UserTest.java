package com.grupo3.backfcyp.models.mongomodels;

import com.grupo3.backfcyp.models.User;
import com.grupo3.backfcyp.repositories.*;
import com.grupo3.backfcyp.services.UserService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@RunWith(SpringJUnit4ClassRunner.class)

@SpringBootTest
@ContextConfiguration
public class UserTest {

    private String name = "prueba 1";
    private String password ="pass prueba";
    private String email = "prueba@usach.cl";
    private boolean bloqued = true;


    private User userTest;

    private User userExit;

    @Autowired
    public UserService userService;

    @MockBean
    public RoleRepository roleRepository;

    @MockBean
    public UserRepository userRepository;

    @MockBean
    public CoordinationRepository coordinationRepository;

    @MockBean
    public CareerRepository careerRepository;

    @MockBean
    private ClassRepository classRepository;


    @Before
    public void prepare(){

        userTest = new User();
        userTest.setName(name);
        userTest.setPassword(password);
        userTest.setEmail(email);
        userTest.setBloqued(bloqued);

        userExit  = new User();
        userExit.setName(name);
        userExit.setPassword(password);
        userExit.setEmail(email);
        userExit.setBloqued(bloqued);
    }

    @Test
    public void testFromEntity(){
        //User userEntity = userRepository.save(userTest);
        Assert.assertNotNull(userTest);
        Assert.assertEquals(userTest.getName(),name);
        Assert.assertEquals(userTest.getEmail(),email);
        Assert.assertEquals(userTest.getPassword(),password);
        Assert.assertEquals(userTest.isBloqued(),bloqued);
    }

    @Test
    public void testGets(){
        //userService.getUserById(new Long(11)).getProblems();
        /*userReal.getClasses_students();
        userReal.getCareers();
        userReal.getClasses_teachers();
        userReal.getCoordCoordinations();
        userReal.getProblems();
        userReal.getSolutions();*/
    }

    @Test
    public void testController(){

        System.out.println(userService.getUsers());
        assertThat(userService.getUsers().equals(userRepository.findAll()));
        userService.getUserById(new Long(1));


    }

    @Configuration
    static class Config {

        @Bean
        public UserService userService() {
            // Assuming MessagingProperties has default ctor.
            return new UserService();
        }

        // Same for MessagingPropertiesRefactor
    }





}
