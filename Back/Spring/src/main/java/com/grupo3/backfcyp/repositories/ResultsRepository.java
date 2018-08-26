package com.grupo3.backfcyp.repositories;

import com.grupo3.backfcyp.strategy.Results;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ResultsRepository extends JpaRepository<Results, Long> {
     public Results findResultsById(Long id);
}
