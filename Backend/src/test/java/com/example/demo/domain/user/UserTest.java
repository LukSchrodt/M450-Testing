package com.example.demo.domain.user;

import com.example.demo.domain.role.Role;
import org.hamcrest.CoreMatchers;
import org.hamcrest.MatcherAssert;
import org.junit.jupiter.api.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserTest {
    final User user = mock(User.class);

    @Test
    void getFirstName() {


        when(user.getFirstName()).thenReturn("Hans");

        System.out.println(user.getFirstName());

        assertThat(user.getFirstName(), is(equalTo("Hans")));
    }

    @Test
    void getLastName() {
    }

    @Test
    void getEmail() {
    }

    @Test
    void getPassword() {
    }

}