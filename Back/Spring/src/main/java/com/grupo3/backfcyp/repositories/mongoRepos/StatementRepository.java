package com.grupo3.backfcyp.repositories.mongoRepos;

import com.grupo3.backfcyp.models.mongoModels.Statement;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StatementRepository extends MongoRepository<Statement,String> {

    public Statement findStatementById(String id);
}
