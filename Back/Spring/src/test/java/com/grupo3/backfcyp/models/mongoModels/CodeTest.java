package com.grupo3.backfcyp.models.mongoModels;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class CodeTest
{
    private Code codigo;
    private String idObtenida = "09";
    @Before
    public void setUp() throws Exception
    {
        codigo = new Code("Prueba");
    }

    /*
    @Test
    public void toString()
    {
        String nombre1 = String.format("Customer[id=%s, firstName='%s', lastName='%s']", "9", "09");
        String nombre2 = codigo.toString();
        assertEquals(nombre1, nombre2);
    }
    */
/*
    @Test
    public void getId()
    {
        String idObtenida = codigo.getId();
        assertEquals("9", idObtenida);
    }

    @Test
    public void setId()
    {
        codigo.setId("999");
        idObtenida = codigo.getId();
        assertEquals("999", idObtenida);
    }

    @Test
    public void getCode()
    {
        String codeObtenida = codigo.getCode();
        assertEquals("09", idObtenida);
    }

    @Test
    public void setCode()
    {

    }
    */
}
