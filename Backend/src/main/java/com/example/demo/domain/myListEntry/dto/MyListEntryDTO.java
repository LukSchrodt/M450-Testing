package com.example.demo.domain.myListEntry.dto;

import com.example.demo.core.generic.ExtendedDTO;
import com.example.demo.domain.user.User;

import java.time.LocalDate;
import java.util.UUID;

public class MyListEntryDTO extends ExtendedDTO {
    private String title;

    private String text;

    private Priority priority;

    public MyListEntryDTO(){
    }

    public MyListEntryDTO(UUID id, String title, String text,Priority priority) {
        super(id);
        this.title = title;
        this.text = text;
        this.priority = priority;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }
}
