package com.grupo3.backfcyp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Inheritance
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String password;
    private String email;
    private boolean bloqued;
    private String career;

    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    private List<Role> roles;

    @OneToMany(mappedBy = "users")
    @JsonIgnore
    private List<User> users;

    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private List<Solution> solutions;

    @OneToMany(mappedBy = "teacher")
    @JsonIgnore
    private List<Problem> problems;

    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    private List<Section> sections;

    @OneToMany(mappedBy = "students")
    @JsonIgnore
    private List<Class> classUser;

    public List<Class> getClassUser() {
        return classUser;
    }

    public void setClassUser(List<Class> classUser) {
        this.classUser = classUser;
    }

    public String getCareer() {
        return career;
    }

    public void setCareer(String career) {
        this.career = career;
    }

    public boolean isBloqued() {
        return bloqued;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void setBloqued(boolean bloqued) {
        this.bloqued = bloqued;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public List<Solution> getSolutions() {
        return solutions;
    }

    public void setSolutions(List<Solution> solutions) {
        this.solutions = solutions;
    }

    public List<Problem> getProblems() {
        return problems;
    }

    public void setProblems(List<Problem> problems) {
        this.problems = problems;
    }

    public List<Section> getSections() {
        return sections;
    }

    public void setSections(List<Section> sections) {
        this.sections = sections;
    }

}
