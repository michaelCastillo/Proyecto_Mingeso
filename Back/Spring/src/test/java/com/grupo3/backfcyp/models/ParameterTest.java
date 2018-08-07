package com.grupo3.backfcyp.models;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class ParameterTest
{
    private Parameter parametros;

    @Before
    public void setUp() throws Exception
    {
        parametros = new Parameter("Prueba");
    }

    @Test
    public void isHidden()
    {
        boolean hiddenObtenida = parametros.isHidden();
        assertEquals(false, hiddenObtenida);
    }

    @Test
    public void setHidden()
    {
        parametros.setHidden(true);
        boolean hiddenObtenida = parametros.isHidden();
        assertEquals(true, hiddenObtenida);
    }

    @Test
    public void getId()
    {
        Long IdObtenida = parametros.getId();
        assertEquals(Long.valueOf(999), IdObtenida);
    }

    @Test
    public void setId()
    {
        parametros.setId(Long.valueOf(99));
        Long idObtenida = parametros.getId();
        assertEquals(Long.valueOf(99), idObtenida);
    }

    @Test
    public void getName()
    {
        String nombreObtenida = parametros.getName();
        assertEquals("nombrePrueba", nombreObtenida);
    }

    @Test
    public void setName()
    {
        parametros.setName("nombreAlterado");
        String nombreObtenida = parametros.getName();
        assertEquals("nombreAlterado", nombreObtenida);
    }

    @Test
    public void getProblem()
    {
        boolean boleano = Problem.class.equals(parametros.getProblem().getClass());
        assertTrue(boleano);
    }

    @Test
    public void setProblem()
    {
        Problem coordinacionX = new Problem("Prueba");
        parametros.setProblem(coordinacionX);
        assertEquals(coordinacionX, parametros.getProblem());
    }
}