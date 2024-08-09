package com.andrewsurratt.spring_starter.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private Instant createdDate;

    String username;

    String message;

    public Message(
            String username,
            String message
    ) {
        this(username, message, Instant.now());
    }

    public Message(
            String username,
            String message,
            Instant createdDate
    ) {
        this.username = username;
        this.message = message;
        this.createdDate = createdDate;
    }
}
