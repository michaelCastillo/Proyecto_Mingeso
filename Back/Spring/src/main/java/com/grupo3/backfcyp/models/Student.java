package com.grupo3.backfcyp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "students")
public class Student extends User {


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
}
