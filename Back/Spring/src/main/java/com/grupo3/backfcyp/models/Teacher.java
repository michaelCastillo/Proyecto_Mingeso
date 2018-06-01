package com.grupo3.backfcyp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;



@Entity
@Table(name = "teachers")
public class Teacher extends User{

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
}
