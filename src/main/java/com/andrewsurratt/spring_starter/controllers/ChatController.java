package com.andrewsurratt.spring_starter.controllers;

import com.andrewsurratt.spring_starter.entities.Message;
import com.andrewsurratt.spring_starter.repositories.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final MessageRepository messageRepository;

    @MessageMapping("/message")
    @SendTo("/topic/room")
    public Message message(
            @Payload Message message
            ) throws Exception {
        Message msg = new Message(message.getUsername(), message.getMessage());
        messageRepository.save(msg);
        return msg;
    }
}
