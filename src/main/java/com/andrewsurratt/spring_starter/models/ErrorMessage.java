package com.andrewsurratt.spring_starter.models;

public record ErrorMessage(String message) {
    public static ErrorMessage from(final String message) {
        return new ErrorMessage(message);
    }
}
