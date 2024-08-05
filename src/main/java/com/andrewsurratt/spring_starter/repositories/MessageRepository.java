package com.andrewsurratt.spring_starter.repositories;

import com.andrewsurratt.spring_starter.entities.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends CrudRepository<Message, UUID> {
    List<Message> findFirst10ByOrderByIdDesc();
}
