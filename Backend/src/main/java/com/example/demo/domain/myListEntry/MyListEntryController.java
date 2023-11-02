package com.example.demo.domain.myListEntry;

import com.example.demo.domain.myListEntry.dto.MyListEntryDTO;
import com.example.demo.domain.myListEntry.dto.MyListEntryMapper;
import com.example.demo.domain.myListEntry.dto.Priority;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@Validated
@RestController
@RequestMapping("/my_lists")
@Log4j2
public class MyListEntryController {

    MyListEntryService myListEntryService;
    MyListEntryMapper myListEntryMapper;

    @Autowired
    public MyListEntryController(MyListEntryService myListEntryService, MyListEntryMapper myListEntryMapper) {
        this.myListEntryService = myListEntryService;
        this.myListEntryMapper = myListEntryMapper;
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('MY_LIST_ENTRY_READ')")
    public ResponseEntity<MyListEntry> getById(@PathVariable UUID id) {
        return new ResponseEntity<>(myListEntryService.getById(id), HttpStatus.OK);
    }

    @GetMapping("/priority/{priority}")
    @PreAuthorize("hasAuthority('MY_LIST_ENTRY_READ')")
    public ResponseEntity<List<MyListEntry>> getByPriority(@PathVariable String priority) {
        return new ResponseEntity<>(myListEntryService.getByPriority(priority), HttpStatus.OK);
    }

    @GetMapping("/")
    @PreAuthorize("hasAuthority('MY_LIST_ENTRY_READ')")
    public ResponseEntity<List<MyListEntry>> getAll() {
        return new ResponseEntity<>(myListEntryService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/mylist")
    @PreAuthorize("hasAuthority('MY_LIST_ENTRY_READ')")
    public ResponseEntity<List<MyListEntry>> getAllByUser() {
        return new ResponseEntity<>(myListEntryService.findAllByUser(), HttpStatus.OK);
    }

    @GetMapping("/sorted")
    @PreAuthorize("hasAuthority('MY_LIST_ENTRY_READ')")
    public ResponseEntity<List<MyListEntry>> getAllSorted() {
        return new ResponseEntity<>(myListEntryService.getSortedByPriority(), HttpStatus.OK);
    }

    @PostMapping("/")
    @PreAuthorize("hasAuthority('MY_LIST_ENTRY_CREATE')")
    public ResponseEntity<MyListEntry> createEntryList(@Valid @RequestBody MyListEntryDTO myListEntryDTO){
        MyListEntry myListEntry = myListEntryMapper.fromDTO(myListEntryDTO);
        return new ResponseEntity<>(myListEntryService.createEntryList(myListEntry), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('MY_LIST_ENTRY_MODIFY') &&  @userPermissionEvaluator.isUserOwner(#id)")
    public ResponseEntity<MyListEntry> updateEntryList(@PathVariable UUID id, @Valid @RequestBody MyListEntryDTO myListEntryDTO) {
        MyListEntry myListEntry = myListEntryMapper.fromDTO(myListEntryDTO);
        return new ResponseEntity<>(myListEntryService.updateById(id, myListEntry), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('MY_LIST_ENTRY_DELETE') &&  @userPermissionEvaluator.isUserOwner(#id)")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        myListEntryService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
