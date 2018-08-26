package com.grupo3.backfcyp.repositories.mongorepos;

import com.grupo3.backfcyp.models.mongomodels.Statement;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StatementRepository extends MongoRepository<Statement,String> {

    public Statement findStatementById(String id);
}
