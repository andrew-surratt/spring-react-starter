package com.andrewsurratt.spring_starter.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig implements WebMvcConfigurer {

    private final ApplicationProperties applicationProps;

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(applicationProps.getClientOriginUrl())
                .allowedHeaders(HttpHeaders.ACCEPT, HttpHeaders.CONTENT_TYPE, HttpHeaders.ORIGIN, HttpHeaders.AUTHORIZATION)
                .allowedMethods(
                        HttpMethod.HEAD.name(),
                        HttpMethod.OPTIONS.name(),
                        HttpMethod.GET.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PATCH.name(),
                        HttpMethod.DELETE.name()
                )
                .maxAge(applicationProps.getCorsMaxAge());
    }
}
