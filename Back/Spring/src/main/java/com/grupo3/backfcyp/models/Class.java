package com.grupo3.backfcyp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "classes")
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String classRoom;
    private String code;

    /* la clase tiene varios alumnos y los alumnos estan en la clase */
    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "students_classess", joinColumns = @JoinColumn(name = "id_student"),inverseJoinColumns = @JoinColumn(name = "id_class"))
    private List<User> students;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "teachers_classess", joinColumns = @JoinColumn(name = "id_teacher"),inverseJoinColumns = @JoinColumn(name = "id_class"))
    private List<User> teachers;

    @ManyToOne
    @JoinTable(name = "id_coordination")
    @JsonIgnore
    private Coordination coordination;

    public Class(){
        this.teachers = new ArrayList<>();
        this.students = new ArrayList<>();
        
    }


    public Coordination getCoordination() {
        return coordination;
    }

    public void setCoordination(Coordination coordination) {
        this.coordination = coordination;
    }

    public List<User> getStudents() {
        return students;
    }

    public void setStudents(List<User> students) {
        this.students = students;
    }

    public void addStudents(User user){
        this.students.add(user);
    }

    public List<User> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<User> teachers) {
        this.teachers = teachers;
    }

    public void addTeacher(User user){
        this.teachers.add(user);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassRoom() {
        return classRoom;
    }

    public void setClassRoom(String classRoom) {
        this.classRoom = classRoom;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }


}
