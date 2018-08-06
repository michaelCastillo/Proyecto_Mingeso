package com.grupo3.backfcyp.models.mongoModels;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class CodeTest
{
    private Code codigo;

    @Before
    public void setUp() throws Exception
    {
        codigo = new Code("Prueba");
    }


    @Test
    public void toString()
    {
        String nombre1 = String.format("Customer[id=%s, firstName='%s', lastName='%s']", "9", "09");
        String nombre2 = codigo.toString();
        assertEquals(nombre1, nombre2);
    }


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
        String idObtenida = codigo.getId();
        assertEquals("999", idObtenida);
    }

    @Test
    public void getCode()
    {
        String codeObtenida = codigo.getCode();
        assertEquals("09", codeObtenida);
    }

    @Test
    public void setCode()
    {
        codigo.setId("0999");
        String codeObtenida = codigo.getId();
        assertEquals("0999", codeObtenida);
    }
}