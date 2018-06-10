package com.grupo3.backfcyp.strategy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grupo3.backfcyp.models.SolutionLog;

import javax.persistence.*;

@Entity
@Table(name = "results")
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
    @JoinColumn(name = "id_log")
    private SolutionLog solutionLog;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public SolutionLog getSolutionLog() {
        return solutionLog;
    }

    public void setSolutionLog(SolutionLog solutionLog) {
        this.solutionLog = solutionLog;
    }
}
