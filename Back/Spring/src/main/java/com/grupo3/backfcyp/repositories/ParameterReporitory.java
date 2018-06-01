package com.grupo3.backfcyp.repositories;


import com.grupo3.backfcyp.models.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParameterReporitory extends JpaRepository<Parameter,Long> {

    public Parameter findParameterById(Long id);

}
