package com.andrewsurratt.spring_starter.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    String name;

    String content;

    public Document(
            String name,
            String content
    ) {
        this.name = name;
        this.content = content;
    }

    public Document() {

    }
}
