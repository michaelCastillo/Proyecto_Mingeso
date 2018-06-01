package com.grupo3.backfcyp.repositories;

import com.grupo3.backfcyp.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher,Long> {
    public Teacher findTeacherById(Long id);
}
