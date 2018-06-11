package com.grupo3.backfcyp.repositories;


import com.grupo3.backfcyp.models.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {
    public Problem findProblemById(Long id);
}
