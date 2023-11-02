package com.example.demo.domain.myListEntry;

import com.example.demo.core.generic.ExtendedRepository;
import com.example.demo.domain.myListEntry.dto.Priority;
import com.example.demo.domain.user.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface MyListEntryRepository extends ExtendedRepository<MyListEntry> {
    List<MyListEntry> findByPriority(Priority priority);
    List<MyListEntry> findAll();
    List<MyListEntry> findByUser(User user);
}
