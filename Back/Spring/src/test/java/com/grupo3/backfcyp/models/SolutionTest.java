package com.grupo3.backfcyp.models;

import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class SolutionTest
{
    private Solution solucion;

    @Before
    public void setUp() throws Exception
    {
        solucion = new Solution("Prueba");
    }

    @Test
    public void addSucc()
    {
        solucion.addSucc();
        assertEquals(10, solucion.getSuccesses());
    }

    @Test
    public void addFails()
    {
        solucion.addFails();
        assertEquals(10, solucion.getFails());
    }

    /*
    @Test
    public void codeGet()
    {
    }
    */

    @Test
    public void testsGet()
    {
        boolean boleano = false;

        List<com.grupo3.backfcyp.strategy.Test> listaPrueba = solucion.testsGet();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = com.grupo3.backfcyp.strategy.Test.class.equals(listaPrueba.get(i).getClass());

            assertTrue(boleano);

            i++;
        }

        if(i == 0)
        {
            boleano = true;
            assertTrue(boleano);
        }
    }

    /*
    @Test
    public void getTest()
    {

    }
    */

    @Test
    public void getId()
    {
        Long IdObtenida = solucion.getId();
        assertEquals(Long.valueOf(999), IdObtenida);
    }

    @Test
    public void setId()
    {
        solucion.setId(Long.valueOf(99));
        Long idObtenida = solucion.getId();
        assertEquals(Long.valueOf(99), idObtenida);
    }

    @Test
    public void getTitle()
    {
        String tutiloObtenida = solucion.getTitle();
        assertEquals("tituloPrueba", tutiloObtenida);
    }

    @Test
    public void setTitle()
    {
        solucion.setTitle("tituloAlterado");
        String tutiloObtenida = solucion.getTitle();
        assertEquals("tituloAlterado", tutiloObtenida);
    }

    @Test
    public void getFails()
    {
        int falloObtenido = solucion.getFails();
        assertEquals(9, falloObtenido);
    }

    @Test
    public void setFails()
    {
        solucion.setFails(10);
        int falloObtenido = solucion.getFails();
        assertEquals(10, falloObtenido);
    }

    @Test
    public void getTime()
    {
        int tiempoObtenido = solucion.getTime();
        assertEquals(9, tiempoObtenido);
    }

    @Test
    public void setTime()
    {
        solucion.setTime(10);
        int tiempoObtenido = solucion.getTime();
        assertEquals(10, tiempoObtenido);
    }

    @Test
    public void getTimestamp()
    {
        assertNotNull(solucion.getTimestamp());
    }

    @Test
    public void setTimestamp()
    {
        java.util.Date date = new java.util.Date();
        solucion.setTimestamp(date);
        assertEquals(date, solucion.getTimestamp());
    }

    @Test
    public void isSuccess()
    {
        boolean boleano = solucion.isSuccess();
        assertEquals(false, boleano);
    }

    @Test
    public void setSuccess()
    {
        solucion.setSuccess(true);
        assertEquals(true, solucion.isSuccess());
    }

    @Test
    public void isClosed()
    {
        boolean boleano = solucion.isClosed();
        assertEquals(false, boleano);
    }

    @Test
    public void setClosed()
    {
        solucion.setClosed(true);
        assertEquals(true, solucion.isClosed());
    }

    @Test
    public void getSuccesses()
    {
        int exitosObtenido = solucion.getSuccesses();
        assertEquals(9, exitosObtenido);
    }

    @Test
    public void setSuccesses()
    {
        solucion.setSuccesses(10);
        int exitosObtenido = solucion.getSuccesses();
        assertEquals(10, exitosObtenido);
    }

    @Test
    public void getErrors()
    {
    }

    @Test
    public void setErrors()
    {
    }

    @Test
    public void getStudent()
    {
    }

    @Test
    public void setStudent()
    {
    }

    @Test
    public void getProblem()
    {
    }

    @Test
    public void setProblem()
    {
    }

    @Test
    public void getSolvedDate()
    {
    }

    @Test
    public void setSolvedDate()
    {
    }

    @Test
    public void getTests()
    {
    }

    @Test
    public void setTests()
    {
    }
}