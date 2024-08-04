package com.andrewsurratt.spring_starter.controllers;

import com.andrewsurratt.spring_starter.entities.Document;
import com.andrewsurratt.spring_starter.repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController()
@RequestMapping(value = "/documents")
public class DocumentController {

    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentController(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Document> createDocument(@RequestBody Document document) {
        return ResponseEntity.ok(documentRepository.save(document));
    }

    @GetMapping(
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Document> getDocument(
    ) {
        return documentRepository.findFirst10ByOrderByIdDesc();
    }

    @GetMapping(
            value = "/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Document> getDocument(
            @PathVariable UUID id
            ) {
        Optional<Document> document = documentRepository.findById(id);

        return document.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping(
            value = "/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Document> updateDocument(
            @PathVariable UUID id,
            @RequestBody Document document
    ) {
        if (documentRepository.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        document.setId(id);

        return ResponseEntity.ok(documentRepository.save(document));
    }

    @DeleteMapping(
            value = "/{id}"
    )
    public ResponseEntity<Void> deleteDocument(@PathVariable UUID id) {
        if (documentRepository.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        documentRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }
}
