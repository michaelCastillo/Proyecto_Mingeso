package com.grupo3.backfcyp.strategy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo3.backfcyp.models.Solution;

import javax.persistence.*;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
@Entity
@Table(name = "logs")
public class Results {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String stdout;
    private String stderr;
    private String error;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "id_solution")
    private Solution solution;


    public String getStdout() {
        return stdout;
    }

    public void setStdout(String stdout) {
        this.stdout = stdout;
    }

    public String getStderr() {
        return stderr;
    }

    public void setStderr(String stderr) {
        this.stderr = stderr;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
