package com.grupo3.backfcyp.repositories;

import com.grupo3.backfcyp.models.Section;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionRepository extends JpaRepository<Section,Long> {
    public Section findSectionById(Long id);
    public Section findSectionByCode(String code);

}
