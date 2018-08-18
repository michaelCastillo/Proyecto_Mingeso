package com.grupo3.backfcyp.models;

public class SimpleProblem{
    private String name;
    private String language;
    private Long id;
    private String statement;
    private String languaje;
    private int difficulty;

    public SimpleProblem(String name, String language, Long id, String statement, String languaje, int difficulty) {
        this.name = name;
        this.language = language;
        this.id = id;
        this.statement = statement;
        this.languaje = languaje;
        this.difficulty = difficulty;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

    public String getLanguaje() {
        return languaje;
    }

    public void setLanguaje(String languaje) {
        this.languaje = languaje;
    }

    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }
}
