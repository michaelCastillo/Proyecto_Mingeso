package com.grupo3.backfcyp.repositories;

import com.grupo3.backfcyp.models.Class;
import com.grupo3.backfcyp.models.Role;
import com.grupo3.backfcyp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface UserRepository extends JpaRepository<User,Long>{
    public User findUserById(Long id);
    public User findUserByEmailAndPasswordIgnoreCase(String email, String password);
    public User findUserByEmail(String email);
    public User findUserByName(String name);
    public List<User> findAllByRoles(List<Role> roles);

    @Query(value = "select u.id_career from users_careers as u where u.id_user = :id",nativeQuery = true)
    public List<Map<String,String>> getUsersByCareer(@Param("id") Long id);

    @Query(value = "select u.id_class from users_classess as u where u.id_user =:id",nativeQuery = true)
    public List<Map<String,String>> getUsersByClass(@Param("id") Long id);



}