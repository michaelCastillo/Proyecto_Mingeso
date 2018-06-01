package com.grupo3.backfcyp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;



@Entity
@Table(name = "teachers")
public class Teacher{

    private String name;
    private String password;
    private String type;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToMany
    @JoinTable(name="coordinations_teachers",joinColumns = @JoinColumn(name = "id_coordination"), inverseJoinColumns = @JoinColumn(name = "id_teacher"))
    private List<Teacher> coordinations;

    @ManyToMany(mappedBy = "teachers")
    private List<Student> students;


    @OneToMany(mappedBy = "teacher")
    private List<Problem> problems;

    public List<Teacher> getCoordinations() {
        return coordinations;
    }

    public void setCoordinations(List<Teacher> coordinations) {
        this.coordinations = coordinations;
    }





    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public List<Problem> getProblems() {
        return problems;
    }

    public void setProblems(List<Problem> problems) {
        this.problems = problems;
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
}
