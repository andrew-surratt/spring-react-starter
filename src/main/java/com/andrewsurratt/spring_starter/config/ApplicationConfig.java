package com.andrewsurratt.spring_starter.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig implements WebMvcConfigurer {

    private final ApplicationProperties applicationProps;
    Logger logger = LoggerFactory.getLogger(ApplicationConfig.class);

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        List<String> originUrls = applicationProps.getClientOriginUrl();
        logger.debug("Registering web origin urls: {}", originUrls);

        registry.addMapping("/**")
                .allowedOrigins(originUrls.toArray(String[]::new))
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
