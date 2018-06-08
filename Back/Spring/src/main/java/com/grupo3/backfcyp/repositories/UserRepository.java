package com.grupo3.backfcyp.repositories;

import com.grupo3.backfcyp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

public interface UserRepository extends JpaRepository<User,Long>{
    public User findUserById(Long id);
    public User findUserByEmailAndPasswordIgnoreCase(String email, String password);

}