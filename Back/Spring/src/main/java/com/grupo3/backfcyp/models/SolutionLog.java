package com.grupo3.backfcyp.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grupo3.backfcyp.strategy.Results;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "solution_logs")

public class SolutionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String code;
    private Date date;

    @OneToMany(mappedBy = "solutionLog")
    private List<Results> resultsList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "id_solution")
    private Solution solution;

    public SolutionLog(){
        this.date = new Date();
    }



    public Solution getSolution() {
        return solution;
    }

    public void setSolution(Solution solution) {
        this.solution = solution;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<Results> getResultsList() {
        return resultsList;
    }

    public void setResultsList(List<Results> resultsList) {
        this.resultsList = resultsList;
    }
}
