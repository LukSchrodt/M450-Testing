package com.example.demo.domain.user;

import com.example.demo.domain.myListEntry.MyListEntry;
import com.example.demo.domain.myListEntry.MyListEntryService;
import com.example.demo.domain.myListEntry.dto.MyListEntryMapper;
import com.example.demo.domain.role.Role;

import com.example.demo.domain.user.dto.UserMapper;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@WebMvcTest
@WithMockUser
class UserServiceTest {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserServiceImpl userService;

    @MockBean
    private UserMapper userMapper;

    @MockBean
    private Role role;

    @MockBean
    private MyListEntry myListEntry;

    @MockBean
    private MyListEntryService myListEntryService;

    @MockBean
    private MyListEntryMapper myListEntryMapper;

    List<MyListEntry> myListEntries;
    Set<Role> roles;

    User userMock = new User(UUID.randomUUID(), "James", "Bond", "admin@exampel.com", "007", roles, myListEntries);

    @Test
    @DisplayName("This test should check if there are any users")
    void shouldGiveBackUsers() {
        when(userService.getByEmail("admin@exampel.com")).thenReturn(userMock);

        assertThat(userService.getByEmail("admin@exampel.com"), is(equalTo(userMock)));
    }
}