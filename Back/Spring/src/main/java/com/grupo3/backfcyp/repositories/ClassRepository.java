package com.grupo3.backfcyp.repositories;

import com.grupo3.backfcyp.models.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository extends JpaRepository<Class,Long> {
    public Class findClassById(Long id);
}
