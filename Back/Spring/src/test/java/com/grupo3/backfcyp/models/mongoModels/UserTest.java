package com.grupo3.backfcyp.models.mongoModels;

import com.grupo3.backfcyp.models.User;
import com.grupo3.backfcyp.repositories.UserRepository;
import com.grupo3.backfcyp.services.UserService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.jws.soap.SOAPBinding;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(UserService.class)
public class UserTest {

    private String name = "prueba 1";
    private String password ="pass prueba";
    private String email = "prueba@usach.cl";
    private boolean bloqued = true;


    private User userTest;

    private User userExit;


    @Autowired
    MockMvc mvc;
    @MockBean
    UserService userService;


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
    public void testController(){
        userService.getUsers();
    }



}
