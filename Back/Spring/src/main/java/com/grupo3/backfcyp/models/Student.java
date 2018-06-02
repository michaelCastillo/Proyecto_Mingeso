package com.grupo3.backfcyp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "students")
public class Student {

    private String name;
    private String password;
    private String type;
    private String email;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    //Relación con los profesores.
    @ManyToMany
    @JsonIgnore
    @JoinTable(name="students_teachers",joinColumns = @JoinColumn(name = "id_student"), inverseJoinColumns = @JoinColumn(name = "id_teacher"))
    private List<Teacher> teachers;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name="studenst_coordinations",joinColumns = @JoinColumn(name = "id_student"), inverseJoinColumns = @JoinColumn(name = "id_coordination"))
    private List<Coordination> coordinations;

    @OneToMany(mappedBy = "student")
    private List<Solution> solutions;


    public Student(){

    }

    public Student(String type){
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Teacher> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<Teacher> teachers) {
        this.teachers = teachers;
    }

    public List<Solution> getSolutions() {
        return solutions;
    }

    public void setSolutions(List<Solution> solutions) {
        this.solutions = solutions;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Coordination> getCoordinations() {
        return coordinations;
    }

    public void setCoordinations(List<Coordination> coordinations) {
        this.coordinations = coordinations;
    }
}
