package com.grupo3.backfcyp.repositories;

import com.grupo3.backfcyp.strategy.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepository extends JpaRepository<Test,Long> {

    public Test getTestById(Long id);
}
