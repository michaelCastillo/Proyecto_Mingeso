package com.grupo3.backfcyp.models.mongomodels;


import javax.persistence.Id;

public class Statement {

    @Id
    private String id;
    private String statement;


    public Statement()
    {

    }

    public Statement(String prueba, String prueba2)
    {
        this.id = prueba;
        this.statement = prueba2;
}
    public Statement(String statement)
    {
        this.statement = statement;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }




}
