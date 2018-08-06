package com.grupo3.backfcyp.models;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class CareerTest
{

    private Career carrer;
    @Before
    public void setUp() throws Exception
    {
        carrer = new Career("Prueba");
    }

    @Test
    public void getId()
    {
        Long IdObtenida = carrer.getId();
        assertEquals(Long.valueOf(999), IdObtenida);
    }

    @Test
    public void setId()
    {
        carrer.setId(Long.valueOf(99));
        Long idObtenida = carrer.getId();
        assertEquals(Long.valueOf(99), idObtenida);
    }

    @Test
    public void getUsers()
    {
        boolean boleano;

        List<User> listaPrueba = carrer.getUsers();

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
    public void setUsers()
    {
        List<User> lista = new ArrayList<User>();
        User usuarioX = new User();
        lista.add(usuarioX);
        carrer.setUsers(lista);
        assertEquals(lista, carrer.getUsers());
    }

    @Test
    public void addUser()
    {
        User usuarioX = new User();
        carrer.addUser(usuarioX);

        assertEquals(usuarioX, carrer.getUsers().get(carrer.getUsers().size() -1));
    }

    @Test
    public void getName()
    {
        String nameObtenida = carrer.getName();
        assertEquals("nombrePrueba", nameObtenida);
    }

    @Test
    public void setName()
    {
        carrer.setName("nombreAlterado");
        String nameObtenida = carrer.getName();
        assertEquals("nombreAlterado", nameObtenida);
    }

    @Test
    public void getCode()
    {
        String codeObtenida = carrer.getCode();
        assertEquals("09", codeObtenida);
    }

    @Test
    public void setCode()
    {
        carrer.setCode("123");
        String codeObtenida = carrer.getCode();
        assertEquals("123", codeObtenida);
    }
}