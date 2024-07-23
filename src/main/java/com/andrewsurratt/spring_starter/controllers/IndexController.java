package com.andrewsurratt.spring_starter.controllers;

import com.andrewsurratt.spring_starter.entities.Document;
import com.andrewsurratt.spring_starter.repositories.DocumentRepository;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
public class IndexController {

    private final DocumentRepository documentRepository;

    @Autowired
    public IndexController(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Document>> getIndex() {
        return ResponseEntity.ok(documentRepository.findFirst10ByOrderByIdDesc());
    }
}
