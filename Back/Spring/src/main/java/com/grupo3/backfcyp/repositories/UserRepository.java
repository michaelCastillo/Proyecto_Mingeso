package com.grupo3.backfcyp.repositories;


import com.grupo3.backfcyp.models.Problem;
import com.grupo3.backfcyp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    public User findUserById(Long id);
}
