package com.grupo3.backfcyp.models;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class RoleTest
{
    private Role rol;

    @Before
    public void setUp() throws Exception
    {
        rol = new Role("Prueba");
    }

    @Test
    public void getId()
    {
        Long IdObtenida = rol.getId();
        assertEquals(Long.valueOf(999), IdObtenida);
    }

    @Test
    public void setId()
    {
        rol.setId(Long.valueOf(99));
        Long idObtenida = rol.getId();
        assertEquals(Long.valueOf(99), idObtenida);
    }

    @Test
    public void getRole()
    {
        String rolObtenida = rol.getRole();
        assertEquals("rolPrueba", rolObtenida);
    }

    @Test
    public void setRole()
    {
        rol.setRole("nombreAlterado");
        String rolObtenida = rol.getRole();
        assertEquals("nombreAlterado", rolObtenida);
    }

    @Test
    public void getUsers()
    {
        boolean boleano = false;

        List<User> listaPrueba = rol.getUsers();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = User.class.equals(listaPrueba.get(i).getClass());

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
    public void setUsers()
    {
        List<User> lista = new ArrayList<User>();
        User usuarioX = new User();
        lista.add(usuarioX);
        rol.setUsers(lista);
        assertEquals(lista, rol.getUsers());
    }
}