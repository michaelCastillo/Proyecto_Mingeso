package com.grupo3.backfcyp.repositories;

import com.grupo3.backfcyp.models.Solution;
import com.grupo3.backfcyp.strategy.Results;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultsRepository extends JpaRepository<Results, Long> {
     public Results findResultsByCodeAndSolution(String code, Solution solution);
}
