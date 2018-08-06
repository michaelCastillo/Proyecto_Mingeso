package com.grupo3.backfcyp.models.mongoModels;


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
        this.id = "9";
        this.statement = "Estado";
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


    @Override
    public String toString() {
        return String.format(
                "Customer[id=%s, firstName='%s', lastName='%s']",
                id, statement);
    }


}
