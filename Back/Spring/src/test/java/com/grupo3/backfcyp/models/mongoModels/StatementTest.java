package com.grupo3.backfcyp.models.mongoModels;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class StatementTest
{
    private Statement state;

    @Before
    public void setUp() throws Exception
    {
        state = new Statement("Prueba", "Prueba");
    }

    @Test
    public void getId()
    {
        String idObtenida = state.getId();
        assertEquals("9", idObtenida);
    }

    @Test
    public void setId()
    {
        state.setId("999");
        String idObtenida = state.getId();
        assertEquals("999", idObtenida);
    }

    @Test
    public void getStatement()
    {
        String statementObtenida = state.getStatement();
        assertEquals("Estado", statementObtenida);
    }

    @Test
    public void setStatement()
    {
        state.setStatement("EstadoAlterado");
        String statementObtenida = state.getStatement();
        assertEquals("EstadoAlterado", statementObtenida);
    }

    /*
    @Test
    public void toString()
    {
        String nombre1 = String.format("Customer[id=%s, firstName='%s', lastName='%s']", "9", "Estado");
        String nombre2 = state.toString();
        assertEquals(nombre1, nombre2);
    }
    */

}