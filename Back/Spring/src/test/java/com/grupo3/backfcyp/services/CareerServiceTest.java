package com.grupo3.backfcyp.services;

import com.grupo3.backfcyp.models.Career;
import com.grupo3.backfcyp.models.Coordination;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class CareerServiceTest
{
    private CareerService servicioCarrera;

    @Before
    public void setUp() throws Exception
    {
        servicioCarrera = new CareerService();
    }
    /*


    @Test
    public void getCareers()
    {
        boolean boleano = false;

        List<Career> listaPrueba = servicioCarrera.getCareers();

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
    public void getCareerById()
    {
        Career carreraObtenida = servicioCarrera.getCareerById(Long.valueOf(1));
        boolean boleano = Career.class.equals(carreraObtenida.getClass());
        assertTrue(boleano);
    }

    */

    @Test
    public void getStudents()
    {

    }

    @Test
    public void setCareer()
    {

    }

    @Test
    public void createCareer()
    {

    }
}