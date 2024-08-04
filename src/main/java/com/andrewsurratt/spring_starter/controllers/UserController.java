package com.andrewsurratt.spring_starter.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserController {
        @GetMapping("/user")
        public Map<String, Object> user(@AuthenticationPrincipal Jwt principal) {
            return principal.getClaims();
        }
}
