package com.grupo3.backfcyp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "careers")
public class Career
{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String name;
    private String code;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "users_careers", joinColumns = @JoinColumn(name = "id_user"),inverseJoinColumns = @JoinColumn(name = "id_career"))
    private List<User> users;

    public Career()
    {
        this.users = new ArrayList<>();
    }


    public Career(String prueba)
    {
        this.id = Long.valueOf(999);
        this.name = prueba;
        this.code = "09";

        List<User> lista = new ArrayList<>();

        this.users = lista;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void addUser(User user){
        this.users.add(user);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
