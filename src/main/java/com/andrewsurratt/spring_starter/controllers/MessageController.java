package com.andrewsurratt.spring_starter.controllers;

import com.andrewsurratt.spring_starter.entities.Message;
import com.andrewsurratt.spring_starter.repositories.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping(value = "/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageRepository messageRepository;

    @GetMapping(
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Message> getMessages(
    ) {
        return messageRepository.findFirst10ByOrderByIdDesc();
    }
}
