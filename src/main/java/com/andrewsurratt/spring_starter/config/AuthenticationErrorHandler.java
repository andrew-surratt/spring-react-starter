package com.andrewsurratt.spring_starter.config;

import java.io.IOException;

import com.andrewsurratt.spring_starter.models.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthenticationErrorHandler implements AuthenticationEntryPoint {

    private final ObjectMapper mapper;

    @Override
    public void commence(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final AuthenticationException authException
    ) throws IOException, ServletException {
        final var errorMessage = ErrorMessage.from("Requires authentication");
        final var json = mapper.writeValueAsString(errorMessage);

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(json);
        response.flushBuffer();
    }
}
