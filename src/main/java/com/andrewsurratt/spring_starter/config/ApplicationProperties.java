package com.andrewsurratt.spring_starter.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.ConstructorBinding;

import lombok.Value;

import java.util.List;

@Value
@ConfigurationProperties(prefix = "application")
public class ApplicationProperties {

    List<String> clientOriginUrl;
    Integer corsMaxAge;

    @ConstructorBinding
    public ApplicationProperties(
            final List<String> clientOriginUrl,
            final Integer corsMaxAge
    ) {
        this.clientOriginUrl = clientOriginUrl;
        this.corsMaxAge = corsMaxAge;
    }

}
