package com.grupo3.backfcyp.models;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class ClassTest
{
    private Class clase;

    @Before
    public void setUp() throws Exception
    {
        clase = new Class("ClasePrueba");
    }

    @Test
    public void getCoordination()
    {
        boolean boleano = Coordination.class.equals(clase.getCoordination().getClass());
        assertTrue(boleano);
    }

    @Test
    public void setCoordination()
    {
        Coordination coordinacion = new Coordination("09");
        clase.setCoordination(coordinacion);
        assertEquals(coordinacion, clase.getCoordination());
    }

    @Test
    public void getStudents()
    {
        boolean boleano;

        List<User> listaPrueba = clase.getStudents();

        int i = 0;
        while(i < listaPrueba.size())
        {

            assertNotNull(listaPrueba.get(i));
            boleano = User.class.equals(listaPrueba.get(i).getClass());

            assertTrue(boleano);

            i++;
        }
    }

    @Test
    public void setStudents()
    {
        List<User> lista = new ArrayList<User>();
        User usuarioX = new User();
        lista.add(usuarioX);
        clase.setStudents(lista);
        assertEquals(lista, clase.getStudents());
    }

    @Test
    public void addStudents()
    {
        User usuarioX = new User();
        clase.addStudents(usuarioX);

        assertEquals(usuarioX, clase.getStudents().get(clase.getStudents().size() -1));
    }

    @Test
    public void getTeachers()
    {
        boolean boleano;

        List<User> listaPrueba = clase.getTeachers();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = User.class.equals(listaPrueba.get(i).getClass());

            assertTrue(boleano);

            i++;
        }
    }

    @Test
    public void setTeachers()
    {
        List<User> lista = new ArrayList<User>();
        User usuarioX = new User();
        lista.add(usuarioX);
        clase.setTeachers(lista);
        assertEquals(lista, clase.getTeachers());
    }

    @Test
    public void addTeacher()
    {
        User usuarioX = new User();
        clase.addTeacher(usuarioX);

        assertEquals(usuarioX, clase.getTeachers().get(clase.getTeachers().size() -1));
    }

    /**
     *
     */
    @Test
    public void getId()
    {
        Long IdObtenida = clase.getId();
        assertEquals(Long.valueOf(999), IdObtenida);
    }

    @Test
    public void setId()
    {
        clase.setId(Long.valueOf(99));
        Long idObtenida = clase.getId();
        assertEquals(Long.valueOf(99), idObtenida);
    }

    @Test
    public void getClassRoom()
    {
        String claseObtenida = clase.getClassRoom();
        assertEquals("ClasePrueba", claseObtenida);
    }

    @Test
    public void setClassRoom()
    {
        clase.setClassRoom("claseAlterado");
        String nameObtenida = clase.getClassRoom();
        assertEquals("claseAlterado", nameObtenida);
    }

    @Test
    public void getCode()
    {
        String codeObtenida = clase.getCode();
        assertEquals("09", codeObtenida);
    }

    @Test
    public void setCode()
    {
        clase.setCode("123");
        String codeObtenida = clase.getCode();
        assertEquals("123", codeObtenida);
    }
}