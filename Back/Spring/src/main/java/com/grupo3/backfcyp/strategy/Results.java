package com.grupo3.backfcyp.strategy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grupo3.backfcyp.models.Solution;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "results")
public class Results {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private Date timestamp;
    private String code;
    private String stdout;
    private String stderr;
    private String error;
    private String results_comparison;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "id_solution")
    private Solution solution;

    public Results(){
        //Se fija la fecha en la que se crea el resultado.
        this.timestamp = new Date();
    }

    public String getComparison() {
        return results_comparison;
    }

    public void setComparison(List<String> comparison) {
        String comparisonFormated = "";
        for(String comp: comparison){
            comparisonFormated += " ";
            comparisonFormated += comp;
        }

        System.out.println("salida!!!!:" + comparisonFormated);
        this.results_comparison = comparisonFormated;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStdout() {
        return stdout;
    }

    public void setStdout(String stdout) {
        this.stdout = stdout;
    }

    public String getStderr() {
        return stderr;
    }

    public void setStderr(String stderr) {
        this.stderr = stderr;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public Solution getSolution() {
        return solution;
    }

    public void setSolution(Solution solution) {
        this.solution = solution;
    }
}
