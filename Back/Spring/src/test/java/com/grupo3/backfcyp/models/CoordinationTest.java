package com.grupo3.backfcyp.models;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class CoordinationTest
{
    private Coordination coordinacion;


    @Before
    public void setUp() throws Exception
    {
        coordinacion = new Coordination("Prueba");
    }

    @Test
    public void getClasses()
    {
        boolean boleano;

        List<Class> listaPrueba = coordinacion.getClasses();

        int i = 0;
        while(i < listaPrueba.size())
        {

            assertNotNull(listaPrueba.get(i));
            boleano = Class.class.equals(listaPrueba.get(i).getClass());

            assertTrue(boleano);

            i++;
        }
    }

    @Test
    public void setClasses()
    {
        List<Class> lista = new ArrayList<Class>();
        Class usuarioX = new Class();
        lista.add(usuarioX);
        coordinacion.setClasses(lista);
        assertEquals(lista, coordinacion.getClasses());
    }

    @Test
    public void getCoordinator()
    {
        boolean boleano = User.class.equals(coordinacion.getCoordinator().getClass());
        assertTrue(boleano);
    }

    @Test
    public void setCoordinator()
    {
        User coordinacionX = new User("Prueba");
        coordinacion.setCoordinator(coordinacionX);
        assertEquals(coordinacionX, coordinacion.getCoordinator());
    }

    @Test
    public void getId()
    {
        Long IdObtenida = coordinacion.getId();
        assertEquals(Long.valueOf(999), IdObtenida);
    }

    @Test
    public void setId()
    {
        coordinacion.setId(Long.valueOf(99));
        Long idObtenida = coordinacion.getId();
        assertEquals(Long.valueOf(99), idObtenida);
    }

    @Test
    public void getCode()
    {
        String codeObtenida = coordinacion.getCode();
        assertEquals("09", codeObtenida);
    }

    @Test
    public void setCode()
    {
        coordinacion.setCode("123");
        String codeObtenida = coordinacion.getCode();
        assertEquals("123", codeObtenida);
    }
}