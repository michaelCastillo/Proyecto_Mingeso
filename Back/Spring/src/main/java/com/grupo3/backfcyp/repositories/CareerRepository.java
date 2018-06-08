package com.grupo3.backfcyp.repositories;


import com.grupo3.backfcyp.models.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareerRepository extends JpaRepository<Career,Long> {
    public Career findCareerById (Long id);
}
