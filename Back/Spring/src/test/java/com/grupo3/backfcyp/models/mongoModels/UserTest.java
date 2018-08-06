package com.grupo3.backfcyp.models.mongoModels;

import com.grupo3.backfcyp.models.User;
import com.grupo3.backfcyp.repositories.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.jws.soap.SOAPBinding;

public class UserTest {

    private String name = "prueba 1";
    private String password ="pass prueba";
    private String email = "prueba@usach.cl";
    private boolean bloqued = true;


    private User userTest;

    private User userExit;


    @Autowired
    private UserRepository userRepository;

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

}
