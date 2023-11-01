package com.example.demo.domain.myListEntry;

import com.example.demo.core.generic.ExtendedService;
import com.example.demo.domain.myListEntry.dto.Priority;
import com.example.demo.domain.user.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface MyListEntryService extends ExtendedService<MyListEntry> {
    MyListEntry getById(UUID id);
    List<MyListEntry> getByPriority(String priority);
    List<MyListEntry> getSortedByPriority();
    MyListEntry createEntryList(MyListEntry myListEntry);
    MyListEntry updateById(UUID id,MyListEntry myListEntry);
    Void deleteById(UUID id);
    List<MyListEntry> findAllByUser();
    User getCurrentUser();

}
