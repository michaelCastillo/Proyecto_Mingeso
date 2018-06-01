package com.grupo3.backfcyp.repositories;


import com.grupo3.backfcyp.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {

    public Student findStudentById(Long id);


}
