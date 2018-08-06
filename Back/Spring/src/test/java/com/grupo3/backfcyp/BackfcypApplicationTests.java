package com.grupo3.backfcyp;

import com.grupo3.backfcyp.models.mongoModels.UserTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BackfcypApplicationTests {

    @Test
    public void contextLoads() {
        UserTest userTest = new UserTest();
        userTest.prepare();
    }

}
