package com.andrewsurratt.spring_starter.config;

import com.andrewsurratt.spring_starter.handlers.ChatHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final ApplicationProperties applicationProps;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myHandler(), "/chat")
                .setAllowedOrigins(applicationProps.getClientOriginUrl());
    }

    @Bean
    public WebSocketHandler myHandler() {
        return new ChatHandler();
    }
}
