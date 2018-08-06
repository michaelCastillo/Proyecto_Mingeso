package com.grupo3.backfcyp.models.mongoModels;

import javax.persistence.Id;

public class Code {

    @Id
    private String id;

    private String code;

    public Code()
    {

    }

    public Code(String prueba)
    {
        this.code = "09";
        this.id = "9";
    }

    /*
    @Override
    public String toString()
    {
        return String.format(
                "Customer[id=%s, firstName='%s', lastName='%s']",
                id, code);
    }
    */


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
