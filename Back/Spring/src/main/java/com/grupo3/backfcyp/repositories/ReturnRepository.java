package com.grupo3.backfcyp.repositories;


import com.grupo3.backfcyp.models.Return;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReturnRepository extends JpaRepository<Return, Long> {
    public Return getReturnById(Long id);
}
