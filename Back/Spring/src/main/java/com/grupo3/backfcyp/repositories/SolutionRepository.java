package com.grupo3.backfcyp.repositories;

import com.grupo3.backfcyp.models.Solution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolutionRepository extends JpaRepository<Solution,Long> {
    public Solution findSolutionById(Long id);
}
