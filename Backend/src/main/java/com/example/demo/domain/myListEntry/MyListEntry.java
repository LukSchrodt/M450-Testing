package com.example.demo.domain.myListEntry;

import com.example.demo.core.generic.ExtendedEntity;
import com.example.demo.domain.myListEntry.dto.Priority;
import com.example.demo.domain.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;


@Entity
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class MyListEntry extends ExtendedEntity {
    @NotNull
    @Column(name = "entry_title")
    private String title;
    @NotNull
    @Column(name = "entry_text")
    private String text;
    @NotNull
    @Column(name = "entry_date")
    private LocalDate date;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "entry_priority")
    private Priority priority;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public MyListEntry(UUID id, String title, String text, LocalDate date, Priority priority, User user) {
        super(id);
        this.title = title;
        this.text = text;
        this.date = date;
        this.priority = priority;
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }
}

