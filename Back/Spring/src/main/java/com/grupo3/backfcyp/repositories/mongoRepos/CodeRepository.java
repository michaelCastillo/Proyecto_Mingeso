package com.grupo3.backfcyp.repositories.mongoRepos;

import com.grupo3.backfcyp.models.mongoModels.Code;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CodeRepository extends MongoRepository<Code,String> {

    public Code findCodeById(String id);
}
