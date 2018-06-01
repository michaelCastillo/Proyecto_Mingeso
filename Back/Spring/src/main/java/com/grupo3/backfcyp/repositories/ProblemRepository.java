package com.grupo3.backfcyp.repositories;


import com.grupo3.backfcyp.models.Problem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {
    public Problem findProblemById(Long id);
}
