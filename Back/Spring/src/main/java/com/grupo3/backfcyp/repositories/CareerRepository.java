package com.grupo3.backfcyp.repositories;

import com.grupo3.backfcyp.models.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CareerRepository extends JpaRepository<Career,Long> {
    public Career findCareerById(Long id);



}
