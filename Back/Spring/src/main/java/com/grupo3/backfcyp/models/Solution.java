package com.grupo3.backfcyp.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grupo3.backfcyp.strategy.Results;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "solutions")
public class Solution {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String title;
    private String code;
    private int fails;
    private int time; //in seconds
    private Date timestamp;
    private boolean success;
    private int successes;
    private String errors;

    @OneToMany(mappedBy = "solution")
    private List<Results> logs;



    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "id_student",nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name="id_problem",nullable = false)
    private Problem problem;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getFails() {
        return fails;
    }

    public void setFails(int fails) {
        this.fails = fails;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public boolean getSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getSuccesses() {
        return successes;
    }

    public void setSuccesses(int successes) {
        this.successes = successes;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Problem getProblem() {
        return problem;
    }

    public void setProblem(Problem problem) {
        this.problem = problem;
    }
}
