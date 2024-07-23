package com.andrewsurratt.spring_starter.repositories;

import com.andrewsurratt.spring_starter.entities.Document;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DocumentRepository extends CrudRepository<Document, UUID> {
    List<Document> findFirst10ByOrderByIdDesc();
}
