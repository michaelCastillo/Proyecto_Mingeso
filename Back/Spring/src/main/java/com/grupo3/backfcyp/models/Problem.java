package com.grupo3.backfcyp.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "problems")
public class Problem
{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String name;
    private String statement;
    private String language;
    private int difficulty;
    private boolean publish;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "id_teacher",nullable = false)
    private User teacher;

    //Obtener los los parametros
    @OneToMany(mappedBy = "problem",cascade = CascadeType.ALL)
    private List<Parameter> parameters;

    @OneToMany(mappedBy = "problem",cascade = CascadeType.ALL)
    private List<Return> returns;

    @OneToMany(mappedBy = "problem")
    private List<Solution> solutions;

    public Problem()
    {

    }

    public Problem(String prueba)
    {
        this.id = Long.valueOf(999);
        this.name = "nombre"+prueba;
        this.statement = "state"+prueba;
        this.language = "lenguaje"+prueba;
        this.difficulty = 999;
        this.publish = false;
        this.teacher = new User();

        this.parameters = new ArrayList<>();
        this.returns = new ArrayList<>();
        this.solutions = new ArrayList<>();
    }

    public boolean isPublish() {
        return publish;
    }

    public void setPublish(boolean publish) {
        this.publish = publish;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }

    public User getTeacher() {
        return teacher;
    }

    public void setTeacher(User teacher) {
        this.teacher = teacher;
    }

    public List<String> getParameters() {
        ArrayList<String> params = new ArrayList<>();
        for(Parameter param: this.parameters){
            params.add(param.getName());
        }
        return params;
    }

    public void setParameters(List<Parameter> parameters) {
        this.parameters = parameters;
    }

    public List<String> getReturns_string() {
        ArrayList<String> returnsAux = new ArrayList<>();
        for(Return return_: this.returns){
            returnsAux.add(return_.getName());
        }
        return returnsAux;
    }

    public List<Parameter> obtenerParametersObj(){
        return this.parameters;
    }
    public List<Return> getReturns(){
        return this.returns;
    }

    public void setReturns(List<Return> returns) {
        this.returns = returns;
    }

    public List<Solution> getSolutions() {
        return solutions;
    }

    public void setSolutions(List<Solution> solutions) {
        this.solutions = solutions;
    }
}
