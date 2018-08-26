package com.grupo3.backfcyp;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@JsonAutoDetect
@EnableAutoConfiguration

public class BackfcypApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackfcypApplication.class, args);
    }
}
