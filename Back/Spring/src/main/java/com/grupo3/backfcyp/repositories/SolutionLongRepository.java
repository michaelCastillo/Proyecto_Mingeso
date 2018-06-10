package com.grupo3.backfcyp.repositories;


import com.grupo3.backfcyp.models.SolutionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolutionLongRepository extends JpaRepository<SolutionLog,Long> {
    public SolutionLog findSolutionLogById(Long id);


}
