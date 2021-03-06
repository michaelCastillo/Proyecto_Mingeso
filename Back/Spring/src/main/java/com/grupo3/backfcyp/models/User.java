package com.grupo3.backfcyp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Inheritance
@Table(name = "users")
public class User
{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String password;
    private String email;
    private boolean bloqued;



    @ManyToMany(mappedBy = "users")
    private List<Role> roles;


    @ManyToMany(mappedBy = "users")
    private List<Career> careers;

    /* El alumno tiene soluciones */

    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private List<Solution> solutions;

    /* El profesor tiene problemas */
    @OneToMany(mappedBy = "teacher")
    @JsonIgnore
    private List<Problem> problems;

    /* El coordinador tiene coordinaciones que manda */

    @OneToMany(mappedBy = "coordinator")
    private List<Coordination> coordCoordinations;

    /* El alumno está en varias clases y las clases tienen varios alumnos.  */
    /* Para el caso del profesor */


    @ManyToMany(mappedBy = "students")
    private List<Class> classesStudents;
    
    @ManyToMany(mappedBy = "teachers")
    private List<Class> classesTeachers;


    public User()
    {


    }

    public User(String prueba)
    {
        this.coordCoordinations = new ArrayList<>();
        this.roles = new ArrayList<>();
        this.careers = new ArrayList<>();
        this.solutions = new ArrayList<>();
        this.problems = new ArrayList<>();
        this.classesStudents = new ArrayList<>();
        this.classesTeachers = new ArrayList<>();

        this.id = Long.valueOf(999);
        this.name = "nombre"+prueba;
        this.password = "pass"+prueba;
        this.email = "email"+prueba;
        this.bloqued = false;
    }


    public List<Coordination> getCoordCoordinations() {
        return coordCoordinations;
    }

    public void setCoordCoordinations(List<Coordination> coordCoordinations) {
        this.coordCoordinations = coordCoordinations;
    }

    public List<Class> getClasses_students() {
        return classesStudents;
    }

    public void addClasse_student(Class classs){
        this.classesStudents.add(classs);
    }

    public List<Class> getClasses_teachers() {
        return classesTeachers;
    }
    public void addClasse_teacher(Class classs){
        this.classesTeachers.add(classs);
    }

    public void setClasses_teachers(List<Class> classesTeachers) {
        this.classesTeachers = classesTeachers;
    }

    public void setClasses_students(List<Class> classesStudents) {
        this.classesStudents = classesStudents;
    }

    public List<Career> getCareers() {
        return careers;
    }

    public void setCareers(List<Career> careers) {
        this.careers = careers;
    }

    public boolean isBloqued() {
        return bloqued;
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



}
