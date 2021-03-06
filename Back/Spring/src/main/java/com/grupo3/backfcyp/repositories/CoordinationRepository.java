package com.grupo3.backfcyp.repositories;

import com.grupo3.backfcyp.models.Coordination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordinationRepository extends JpaRepository<Coordination,Long> {
    public Coordination findCoordinationById(Long id);
    public Coordination findCoordinationByCode(String code);

}
