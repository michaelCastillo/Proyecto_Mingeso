package com.grupo3.backfcyp.models;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class ReturnTest
{
    private Return retorno;

    @Before
    public void setUp() throws Exception
    {
        retorno = new Return("Prueba");
    }

    @Test
    public void isHidden()
    {
        boolean boleano = retorno.isHidden();
        assertEquals(false, boleano);
    }

    @Test
    public void setHidden()
    {
        retorno.setHidden(true);
        assertEquals(true, retorno.isHidden());
    }

    @Test
    public void getId()
    {
        Long IdObtenida = retorno.getId();
        assertEquals(Long.valueOf(999), IdObtenida);
    }

    @Test
    public void setId()
    {
        retorno.setId(Long.valueOf(99));
        Long idObtenida = retorno.getId();
        assertEquals(Long.valueOf(99), idObtenida);
    }

    @Test
    public void getName()
    {
        String nombreObtenida = retorno.getName();
        assertEquals("nombrePrueba", nombreObtenida);
    }

    @Test
    public void setName()
    {
        retorno.setName("nombreAlterado");
        String nombreObtenida = retorno.getName();
        assertEquals("nombreAlterado", nombreObtenida);
    }

    @Test
    public void getProblem()
    {
        boolean boleano = Problem.class.equals(retorno.getProblem().getClass());
        assertTrue(boleano);
    }

    @Test
    public void setProblem()
    {
        Problem coordinacionX = new Problem("Prueba");
        retorno.setProblem(coordinacionX);
        assertEquals(coordinacionX, retorno.getProblem());
    }
}