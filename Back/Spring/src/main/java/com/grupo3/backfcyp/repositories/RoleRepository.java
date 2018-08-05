package com.grupo3.backfcyp.repositories;

import com.grupo3.backfcyp.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
    public Role findRoleById(Long id);
    public Role findRoleByRole(String role);

}
