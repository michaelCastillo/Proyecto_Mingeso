package com.grupo3.backfcyp.repositories;


import com.grupo3.backfcyp.models.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {
    public Problem findProblemById(Long id);

    @Query(value = "select p.id,p.name,p.difficulty,p.language,p.publish,p.statement from problems as p",nativeQuery = true)
    public List<Map<String,String>> findAllProblemsReduced();

}



