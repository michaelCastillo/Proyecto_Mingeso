package com.grupo3.backfcyp.models;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "coordinations")
public class Coordination extends User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToMany(mappedBy = "coordinations")
    private List<Teacher> teachers;

    @ManyToMany(mappedBy = "coordinations")
    private List<Student> students;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Teacher> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<Teacher> teachers) {
        this.teachers = teachers;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }
}
