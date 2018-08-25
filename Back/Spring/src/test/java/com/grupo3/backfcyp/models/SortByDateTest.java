package com.grupo3.backfcyp.models;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class SortByDateTest
{
    private SortByDate ejemplo;

    @Before
    public void setUp() throws Exception
    {
        ejemplo = new SortByDate();
    }

    @Test
    public void compare()
    {
        com.grupo3.backfcyp.strategy.Test caso1 = new com.grupo3.backfcyp.strategy.Test();
        com.grupo3.backfcyp.strategy.Test caso2 = new com.grupo3.backfcyp.strategy.Test();
        int respuesta = ejemplo.compare(caso1, caso2);
        boolean boleano = Math.round(respuesta) == (double)respuesta;
        assertTrue(boleano);
    }
}