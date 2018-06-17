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
    private boolean success; //if is true, the problem is solved.
    private boolean closed; //if is true, the problem is solved and
    //closed. (the user clicked on Send and its success.)
    private int successes;
    private String errors;



    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "id_student",nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name="id_problem",nullable = false)
    private Problem problem;

    @OneToMany(mappedBy = "solution")
    private List<Results> results;

    public Solution(){

    }

    public Solution(String title, String code, int fails, int time, Date timestamp, boolean success, boolean closed, int successes, String errors, User student, Problem problem) {
        this.title = title;
        this.code = code;
        this.fails = fails;
        this.time = time;
        this.timestamp = timestamp;
        this.success = success;
        this.closed = closed;
        this.successes = successes;
        this.errors = errors;
        this.student = student;
        this.problem = problem;
    }

    public List<Results> getResults() {
        return results;
    }

    public void addSucc(){
        this.successes++;
    }
    public void addFails(){
        this.fails++;
    }



    public void setResults(List<Results> results) {
        this.results = results;
    }

    public void addResult(Results results){
        this.results.add(results);
    }

    public boolean isClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getErrors() {
        return errors;
    }

    public void setErrors(String errors) {
        this.errors = errors;
    }


    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

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



    public Problem getProblem() {
        return problem;
    }

    public void setProblem(Problem problem) {
        this.problem = problem;
    }
}
