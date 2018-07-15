package com.grupo3.backfcyp.strategy;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grupo3.backfcyp.models.Solution;
import com.grupo3.backfcyp.models.mongoModels.Code;
import com.grupo3.backfcyp.repositories.mongoRepos.CodeRepository;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "tests")
public class Test {


    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "id")
    private Long id;

    private Date created;
    private String codeId; //Deberia ser la id del codigo en mongo
    private boolean correct;
    private String language;
    @Transient
    private Strategy strategy;


    /* Solution -> test -> result */
    @ManyToOne
    @JoinColumn(name = "id_solution")
    @JsonIgnore
    private Solution solution;


    @OneToMany(mappedBy = "test")
    private List<Results> results;


    public Test(Strategy strategy){
        this.created = new Date();
        this.strategy = strategy;
    }

    public Test(){
        this.created = new Date();
    }

    public List<Results> exec(ArrayList<String> o_inputs, CodeRepository codeRepository){
        System.out.println(this.language);
        if(this.language.compareTo("python") == 0){
            System.out.println("Es python!");
            //Si es python.
            this.strategy = new StrategyPython();
        }else if(this.language.compareTo("c") == 0){
            this.strategy = new StrategyC();
            System.out.println("Es C");
        }else if(this.language.compareTo("java") == 0){
            System.out.println("Es java!");
            this.strategy = new StrategyJava();
            //Strategy java.
        }
        //Se ejecuta y retorna los resultados.
        this.results = this.strategy.executeProgram(this,o_inputs, codeRepository);
        for(Results res: this.results){
            res.setTest(this);
        }
        return results;
    }

    public ArrayList<String> compareResults(ArrayList<String> o_outputs){
        //Por ahora se hace con una sola salida.
        List<Results> results = this.getResults();
        ArrayList<String> result_compare = new ArrayList<>();
        int numCorrects = 0;
        int i = 0;
        for(String out: o_outputs) {


            if (results.get(i).getError().equals("")) {
                String[] stdout_s = results.get(i).getStdout().split("\n");
                System.out.println("  Glot: " + stdout_s[0] + "  Front: " + o_outputs.get(i));
                if (stdout_s[0].equals(o_outputs.get(i))) {
                    System.out.println("Las salidas son iguales");
                    numCorrects++;
                    this.results.get(i).setResult(true);
                    result_compare.add("Correcto");
                } else {
                    this.results.get(i).setResult(false);
                    result_compare.add("Incorrecto");
                }
            }

            if (numCorrects == result_compare.size()) {
                this.correct = true;
            } else {
                this.correct= false;
            }
            i++;
        }
        return result_compare;
    }




    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public String codeIdGet() {
        return codeId;
    }

    public void codeIdSet(String codeId) {
        this.codeId = codeId;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }

    public Solution getSolution() {
        return solution;
    }

    public void setSolution(Solution solution) {
        this.solution = solution;
    }

    public List<Results> getResults() {
        return results;
    }

    public void setResults(List<Results> results) {
        this.results = results;
    }

    public String getCode(CodeRepository codeRepository) {
        Code code = codeRepository.findCodeById(this.codeId);
        if(code != null){
            return code.getCode();
        }else{
            return "";
        }
    }


}
