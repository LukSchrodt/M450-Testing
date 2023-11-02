package com.example.demo.domain.myListEntry;

import com.example.demo.core.generic.ExtendedServiceImpl;
import com.example.demo.domain.myListEntry.dto.Priority;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserService;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Log4j2
@Service
public class MyListEntryServiceImpl extends ExtendedServiceImpl<MyListEntry> implements MyListEntryService {
    @Autowired
    private UserService userService;

    @Autowired
    public MyListEntryServiceImpl(MyListEntryRepository repository, Logger logger){
        super(repository, logger);
    }

    @Override
    @ReadOnlyProperty
    public MyListEntry getById(UUID id){
            return repository.findById(id).orElseThrow(() -> new NoSuchElementException("No Element with the given ID"));
    }

    @Override
    @ReadOnlyProperty
    public List<MyListEntry> getByPriority(String priority){
        priority = priority.toUpperCase();
        List<MyListEntry> entries;
        if (priority.equals("HIGH")){entries = ((MyListEntryRepository) repository).findByPriority(Priority.HIGH);}
        else if (priority.equals("MEDIUM")){entries = ((MyListEntryRepository) repository).findByPriority(Priority.MEDIUM);}
        else if (priority.equals("LOW")){entries = ((MyListEntryRepository) repository).findByPriority(Priority.LOW);}
        else {entries = repository.findAll();}
        return entries;
    }

    @Override
    @ReadOnlyProperty
    public List<MyListEntry> getSortedByPriority(){
        List<MyListEntry> entryListH = getByPriority("HIGH");
        List<MyListEntry> entryListM = getByPriority("MEDIUM");
        List<MyListEntry> entryListL = getByPriority("LOW");
        entryListH.addAll(entryListM);
        entryListH.addAll(entryListL);

        log.debug("Oderded list:" + entryListH);

        return entryListH;
    }

    @Override
    @ReadOnlyProperty
    public List<MyListEntry> findAllByUser(){
        User user = getCurrentUser();
        return((MyListEntryRepository) repository).findByUser(user);
    }

    @Override
    public MyListEntry createEntryList(MyListEntry myListEntry){
        myListEntry.setUser(getCurrentUser());
        myListEntry.setDate(LocalDate.now());
        return repository.save(myListEntry);
    }

    @Override
    @Transactional
    public MyListEntry updateById(UUID id, MyListEntry myListEntry){

            if (repository.existsById(id)) {
                MyListEntry entryList = repository.findById(id).get();
                entryList.setPriority(myListEntry.getPriority());
                entryList.setText(myListEntry.getText());
                entryList.setTitle(myListEntry.getTitle());
                return repository.save(entryList);
            } else {
                myListEntry.setUser(getCurrentUser());
                myListEntry.setDate(LocalDate.now());
                return repository.save(myListEntry);
            }
    }

    @Override
    public Void deleteById(UUID id) {
        return super.deleteById(id);
    }

    @Override
    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        log.info("Attempting to find User with Email: {}", auth.getName());
        User user = userService.getByEmail(auth.getName());
        log.info("Found User {} with Email {}", user, auth.getName());

        return user;
    }
}
