package com.grupo3.backfcyp.models;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class UserTest
{
    private User usuario;

    @Before
    public void setUp() throws Exception
    {
        usuario = new User("Prueba");
    }

    @Test
    public void getCoordCoordinations()
    {
        boolean boleano = false;

        List<Coordination> listaPrueba = usuario.getCoordCoordinations();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = Coordination.class.equals(listaPrueba.get(i).getClass());

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
    public void setCoordCoordinations()
    {
        List<Coordination> lista = new ArrayList<Coordination>();
        Coordination coordinacionX = new Coordination();
        lista.add(coordinacionX);
        usuario.setCoordCoordinations(lista);
        assertEquals(lista, usuario.getCoordCoordinations());
    }

    @Test
    public void getClasses_students()
    {
        boolean boleano = false;

        List<Class> listaPrueba = usuario.getClasses_students();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = Class.class.equals(listaPrueba.get(i).getClass());

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
    public void addClasse_student()
    {
        Class clase = new Class("Prueba");
        usuario.addClasse_student(clase);
        assertEquals(clase, usuario.getClasses_students().get(0));
    }

    @Test
    public void getClasses_teachers()
    {
        boolean boleano = false;

        List<Class> listaPrueba = usuario.getClasses_teachers();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = Class.class.equals(listaPrueba.get(i).getClass());

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
    public void addClasse_teacher()
    {
        Class clase = new Class("Prueba");
        usuario.addClasse_teacher(clase);
        assertEquals(clase, usuario.getClasses_teachers().get(0));
    }

    @Test
    public void setClasses_teachers()
    {
        List<Class> lista = new ArrayList<Class>();
        Class claseX = new Class();
        lista.add(claseX);
        usuario.setClasses_teachers(lista);
        assertEquals(lista, usuario.getClasses_teachers());
    }

    @Test
    public void setClasses_students()
    {
        List<Class> lista = new ArrayList<Class>();
        Class claseX = new Class();
        lista.add(claseX);
        usuario.setClasses_students(lista);
        assertEquals(lista, usuario.getClasses_students());
    }

    @Test
    public void getCareers()
    {
        boolean boleano = false;

        List<Career> listaPrueba = usuario.getCareers();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = Career.class.equals(listaPrueba.get(i).getClass());

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
    public void setCareers()
    {
        List<Career> lista = new ArrayList<Career>();
        Career carreraX = new Career();
        lista.add(carreraX);
        usuario.setCareers(lista);
        assertEquals(lista, usuario.getCareers());
    }

    @Test
    public void isBloqued()
    {
        assertEquals(false, usuario.isBloqued());
    }

    @Test
    public void setBloqued()
    {
        usuario.setBloqued(true);
        assertEquals(true, usuario.isBloqued());
    }

    @Test
    public void getId()
    {
        Long IdObtenida = usuario.getId();
        assertEquals(Long.valueOf(999), IdObtenida);
    }

    @Test
    public void setId()
    {
        usuario.setId(Long.valueOf(99));
        Long idObtenida = usuario.getId();
        assertEquals(Long.valueOf(99), idObtenida);
    }

    @Test
    public void getName()
    {
        String nombreObtenida = usuario.getName();
        assertEquals("nombrePrueba", nombreObtenida);
    }

    @Test
    public void setName()
    {
        usuario.setName("nombreAlterado");
        String nombreObtenida = usuario.getName();
        assertEquals("nombreAlterado", nombreObtenida);
    }

    @Test
    public void getPassword()
    {
        String passObtenida = usuario.getPassword();
        assertEquals("passPrueba", passObtenida);
    }

    @Test
    public void setPassword()
    {
        usuario.setPassword("passAlterado");
        String passObtenida = usuario.getPassword();
        assertEquals("passAlterado", passObtenida);
    }

    @Test
    public void getEmail()
    {
        String emailObtenida = usuario.getEmail();
        assertEquals("emailPrueba", emailObtenida);
    }

    @Test
    public void setEmail()
    {
        usuario.setEmail("emailAlterado");
        String emailObtenida = usuario.getEmail();
        assertEquals("emailAlterado", emailObtenida);
    }

    @Test
    public void getRoles()
    {
        boolean boleano = false;

        List<Role> listaPrueba = usuario.getRoles();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = Role.class.equals(listaPrueba.get(i).getClass());

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
    public void setRoles()
    {
        List<Role> lista = new ArrayList<Role>();
        Role rolX = new Role();
        lista.add(rolX);
        usuario.setRoles(lista);
        assertEquals(lista, usuario.getRoles());
    }

    @Test
    public void getSolutions()
    {
        boolean boleano = false;

        List<Solution> listaPrueba = usuario.getSolutions();

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
        usuario.setSolutions(lista);
        assertEquals(lista, usuario.getSolutions());
    }

    @Test
    public void getProblems()
    {
        boolean boleano = false;

        List<Problem> listaPrueba = usuario.getProblems();

        int i = 0;
        while(i < listaPrueba.size())
        {
            assertNotNull(listaPrueba.get(i));
            boleano = Problem.class.equals(listaPrueba.get(i).getClass());

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
    public void setProblems()
    {
        List<Problem> lista = new ArrayList<Problem>();
        Problem problemaX = new Problem();
        lista.add(problemaX);
        usuario.setProblems(lista);
        assertEquals(lista, usuario.getProblems());
    }
}