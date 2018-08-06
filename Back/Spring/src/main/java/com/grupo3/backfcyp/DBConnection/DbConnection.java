package com.grupo3.backfcyp.DBConnection;

import com.grupo3.backfcyp.models.Coordination;
import com.grupo3.backfcyp.models.Role;
import com.grupo3.backfcyp.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;

public class DbConnection {
    private static DbConnection ourInstance = new DbConnection();

    public static DbConnection getInstance() {
        return ourInstance;
    }

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CareerRepository careerRepository;
    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private CoordinationRepository coordinationRepository;
    @Autowired
    private LogRepository logRepository;
    @Autowired
    private ParameterReporitory parameterReporitory;
    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private ResultsRepository resultsRepository;
    @Autowired
    private ReturnRepository returnRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private SolutionRepository solutionRepository;
    @Autowired
    private TestRepository testRepository;

    private DbConnection() {

    }

    public static DbConnection getOurInstance() {
        if(ourInstance == null){
            ourInstance = new DbConnection();
        }
        return ourInstance;
    }

    public static void setOurInstance(DbConnection ourInstance) {
        DbConnection.ourInstance = ourInstance;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public CareerRepository getCareerRepository() {
        return careerRepository;
    }

    public void setCareerRepository(CareerRepository careerRepository) {
        this.careerRepository = careerRepository;
    }

    public ClassRepository getClassRepository() {
        return classRepository;
    }

    public void setClassRepository(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    public CoordinationRepository getCoordinationRepository() {
        return coordinationRepository;
    }

    public void setCoordinationRepository(CoordinationRepository coordinationRepository) {
        this.coordinationRepository = coordinationRepository;
    }

    public LogRepository getLogRepository() {
        return logRepository;
    }

    public void setLogRepository(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public ParameterReporitory getParameterReporitory() {
        return parameterReporitory;
    }

    public void setParameterReporitory(ParameterReporitory parameterReporitory) {
        this.parameterReporitory = parameterReporitory;
    }

    public ProblemRepository getProblemRepository() {
        return problemRepository;
    }

    public void setProblemRepository(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    public ResultsRepository getResultsRepository() {
        return resultsRepository;
    }

    public void setResultsRepository(ResultsRepository resultsRepository) {
        this.resultsRepository = resultsRepository;
    }

    public ReturnRepository getReturnRepository() {
        return returnRepository;
    }

    public void setReturnRepository(ReturnRepository returnRepository) {
        this.returnRepository = returnRepository;
    }

    public RoleRepository getRoleRepository() {
        return roleRepository;
    }

    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public SolutionRepository getSolutionRepository() {
        return solutionRepository;
    }

    public void setSolutionRepository(SolutionRepository solutionRepository) {
        this.solutionRepository = solutionRepository;
    }

    public TestRepository getTestRepository() {
        return testRepository;
    }

    public void setTestRepository(TestRepository testRepository) {
        this.testRepository = testRepository;
    }
}
