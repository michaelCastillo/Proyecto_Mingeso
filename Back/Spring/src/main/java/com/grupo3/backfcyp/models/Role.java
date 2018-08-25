package com.grupo3.backfcyp.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "roles")
public class Role
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String role;

    @ManyToMany
    @JsonIgnore
    @Nullable
    @JoinTable(name="users_roles",joinColumns = @JoinColumn(name = "id_roles"), inverseJoinColumns = @JoinColumn(name = "id_users"))
    private List<User> users;

    public Role()
    {

    }

    public Role(String prueba)
    {
        this.id = Long.valueOf(999);
        this.role = "rolPrueba";
        this.users = new ArrayList<User>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
