package com.grupo3.backfcyp.models;

import com.sun.org.apache.xpath.internal.operations.Bool;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class ProblemTest
{
    private Problem problema;

    @Before
    public void setUp() throws Exception
    {
        problema = new Problem("Prueba");
    }

    @Test
    public void isPublish()
    {
        boolean publishObtenida = problema.isPublish();
        assertEquals(false, publishObtenida);
    }

    @Test
    public void setPublish()
    {
        problema.setPublish(true);
        boolean publishObtenida = problema.isPublish();
        assertEquals(true, publishObtenida);
    }

    @Test
    public void getId()
    {
        Long IdObtenida = problema.getId();
        assertEquals(Long.valueOf(999), IdObtenida);
    }

    @Test
    public void setId()
    {
        problema.setId(Long.valueOf(99));
        Long idObtenida = problema.getId();
        assertEquals(Long.valueOf(99), idObtenida);
    }

    @Test
    public void getName()
    {
        String nombreObtenida = problema.getName();
        assertEquals("nombrePrueba", nombreObtenida);
    }

    @Test
    public void setName()
    {
        problema.setName("nombreAlterado");
        String nombreObtenida = problema.getName();
        assertEquals("nombreAlterado", nombreObtenida);
    }

    @Test
    public void getStatement()
    {
        String stateObtenida = problema.getStatement();
        assertEquals("statePrueba", stateObtenida);
    }

    @Test
    public void setStatement()
    {
        problema.setStatement("stateAlterado");
        String stateObtenida = problema.getStatement();
        assertEquals("stateAlterado", stateObtenida);
    }

    @Test
    public void getLanguage()
    {
        String lenguajeObtenida = problema.getLanguage();
        assertEquals("lenguajePrueba", lenguajeObtenida);
    }

    @Test
    public void setLanguage()
    {
        problema.setLanguage("lenguajeAlterado");
        String lenguajeObtenida = problema.getLanguage();
        assertEquals("lenguajeAlterado", lenguajeObtenida);
    }

    @Test
    public void getDifficulty()
    {
        int dificultadObtenida = problema.getDifficulty();
        assertEquals(999, dificultadObtenida);
    }

    @Test
    public void setDifficulty()
    {
        problema.setDifficulty(123);
        int dificultadObtenida = problema.getDifficulty();
        assertEquals(123, dificultadObtenida);
    }

    @Test
    public void getTeacher()
    {
        Boolean boleano = User.class.equals(problema.getTeacher().getClass());
        assertTrue(boleano);
    }

    @Test
    public void setTeacher()
    {
        User profesorX = new User("Prueba");
        problema.setTeacher(profesorX);
        assertEquals(profesorX, problema.getTeacher());
    }

    @Test
    public void getParameters()
    {
        boolean boleano = false;

        List<String> listaPrueba = problema.getParameters();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = String.class.equals(listaPrueba.get(i).getClass());

            assertTrue(boleano);

            i++;
        }

        if(i == 0)
        {
            boleano = true;
            assertTrue(boleano);
        }
    }

    @Test
    public void setParameters()
    {
        List<Parameter> lista = new ArrayList<Parameter>();
        Parameter parameterX = new Parameter("Prueba");
        lista.add(parameterX);
        problema.setParameters(lista);

        boolean boleano1 = false;
        boolean boleano2 = false;
        List<String> listaPrueba = problema.getParameters();

        if(1 == listaPrueba.size())
        {
            boleano1 = true;
            boleano2 = String.class.equals(listaPrueba.get(0).getClass());
        }


        assertTrue(boleano1);
        assertTrue(boleano2);
    }

    @Test
    public void getReturns_string()
    {
        boolean boleano = false;

        List<String> listaPrueba = problema.getReturns_string();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = String.class.equals(listaPrueba.get(i).getClass());

            assertTrue(boleano);

            i++;
        }

        if(i == 0)
        {
            boleano = true;
            assertTrue(boleano);
        }
    }

    @Test
    public void obtenerParametersObj()
    {
        boolean boleano = false;

        List<Parameter> listaPrueba = problema.obtenerParametersObj();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = Parameter.class.equals(listaPrueba.get(i).getClass());

            assertTrue(boleano);

            i++;
        }

        if(i == 0)
        {
            boleano = true;
            assertTrue(boleano);
        }
    }

    @Test
    public void getReturns()
    {
        boolean boleano = false;

        List<Return> listaPrueba = problema.getReturns();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = Return.class.equals(listaPrueba.get(i).getClass());

            assertTrue(boleano);

            i++;
        }

        if(i == 0)
        {
            boleano = true;
            assertTrue(boleano);
        }
    }

    @Test
    public void setReturns()
    {
        List<Return> lista = new ArrayList<Return>();
        Return retornoX = new Return();
        lista.add(retornoX);
        problema.setReturns(lista);
        assertEquals(lista, problema.getReturns());
    }

    @Test
    public void getSolutions()
    {
        boolean boleano = false;

        List<Solution> listaPrueba = problema.getSolutions();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = Solution.class.equals(listaPrueba.get(i).getClass());

            assertTrue(boleano);

            i++;
        }

        if(i == 0)
        {
            boleano = true;
            assertTrue(boleano);
        }
    }

    @Test
    public void setSolutions()
    {
        List<Solution> lista = new ArrayList<Solution>();
        Solution solucionX = new Solution();
        lista.add(solucionX);
        problema.setSolutions(lista);
        assertEquals(lista, problema.getSolutions());
    }
}