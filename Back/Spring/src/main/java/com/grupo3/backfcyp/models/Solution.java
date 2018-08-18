package com.grupo3.backfcyp.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.grupo3.backfcyp.repositories.mongoRepos.CodeRepository;
import com.grupo3.backfcyp.strategy.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.*;



@Entity
@Table(name = "solutions")
public class Solution
{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String title;
    private int fails;
    private int time; //in seconds
    private Date timestamp;
    private boolean success; //if is true, the problem is solved.
    private boolean closed; //if is true, the problem is solved and
    //closed. (the user clicked on Send and its success.)
    private int successes;
    private String errors;
    private Date solvedDate;
    @Transient
    @Autowired
    private CodeRepository codeRepositoryMongo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "id_student",nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    @JoinColumn(name="id_problem",nullable = false)
    private Problem problem;

    @OneToMany(mappedBy = "solution")
    private List<Test> tests;

    public Solution(){
        this.tests = new ArrayList<>();
    }

    public Solution(String title, int fails, int time, Date timestamp, boolean success, boolean closed, int successes, String errors, User student, Problem problem) {
        this.title = title;
        this.fails = fails;
        this.time = time;
        this.timestamp = timestamp;
        this.success = success;
        this.closed = closed;
        this.successes = successes;
        this.errors = errors;
        this.student = student;
        this.problem = problem;
        this.tests = new ArrayList<>();
    }

    public Solution(String prueba)
    {
        this.id = Long.valueOf(999);
        this.title = "tituloPrueba";
        this.fails = 9;
        this.time = 9;
        this.timestamp = new java.util.Date();
        this.success = false;
        this.closed = false;
        this.successes = 9;
        this.errors = "errorPrueba";
        this.solvedDate = new java.util.Date();
        //this.codeRepositoryMongo
        this.student = new User();
        this.problem = new Problem();
        this.tests = new ArrayList<Test>();
    }



    public void addSucc(){
        this.successes++;
    }
    public void addFails(){
        this.fails++;
    }

    public String codeGet(CodeRepository codeRepository){

        List<Test> tests = this.tests;
        if(!tests.isEmpty()){
            if(tests.size()>1){
                Collections.sort(tests,new SortByDate());
            }
            if(tests.size() > 0){
                return tests.get(0).getCode(codeRepository);
            }
            return "ingrese codigo";
        }else{
            return "ingrese codigo";
        }

    }
    public List<Test> testsGet() {
        return tests;
    }
    public Test getTest()
    {
        if(tests.size()>1)
        {
            Collections.sort(tests,new SortByDate());
        }
        if(tests.size() > 0)
        {
            return tests.get(0);
        }
        return null;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    public int getSuccesses() {
        return successes;
    }

    public void setSuccesses(int successes) {
        this.successes = successes;
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

    public Problem getProblem() {
        return problem;
    }

    public void setProblem(Problem problem) {
        this.problem = problem;
    }

    public Date getSolvedDate() {
        return solvedDate;
    }

    public void setSolvedDate(Date solvedDate) {
        this.solvedDate = solvedDate;
    }

    public List<Test> getTests() {
        return tests;
    }

    public void setTests(List<Test> tests) {
        this.tests = tests;
    }
}

class SortByDate implements Comparator<Test> {

    @Override
    public int compare(Test o1, Test o2) {
        return -o1.getCreated().compareTo(o2.getCreated());
    }
}
