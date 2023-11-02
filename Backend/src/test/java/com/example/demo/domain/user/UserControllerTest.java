package com.example.demo.domain.user;

import com.example.demo.core.security.JWTAuthenticationFilter;
import com.example.demo.core.security.helpers.JwtProperties;
import com.example.demo.domain.myListEntry.MyListEntry;
import com.example.demo.domain.myListEntry.MyListEntryService;
import com.example.demo.domain.myListEntry.dto.MyListEntryMapper;
import com.example.demo.domain.role.Role;
import com.example.demo.domain.user.dto.UserRegisterDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.JwtBuilder;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
@WithMockUser(username = "admin@example.com", password = "007", authorities = "USER_CREATE")
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

    @MockBean
    private UserController userController;
    @MockBean
    private UserServiceImpl userService;
    @MockBean
    private JwtProperties jwtProperties;
    @MockBean
    private JWTAuthenticationFilter jwtAuthenticationFilter;
    @MockBean
    private MyListEntryService myListEntryService;
    @MockBean
    private MyListEntryMapper myListEntryMapper;
    @MockBean
    private Role role;
    @MockBean
    private MyListEntry myListEntry;

    List<MyListEntry> myListEntries;
    Set<Role> roles;

    User userMock = new User(UUID.randomUUID(), "James", "Bond", "admin1@exampel.com", "007", roles, myListEntries);

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Test get All user enpoint.")
    public void testRetrieveAll() throws Exception {
        mockMvc.perform(get("/user/"))
                .andExpect(status().is(200));
    }

    @Test
    @DisplayName("Test if User is himself.")
    public void testIsUserItSelf() throws Exception {
        mockMvc.perform(get("/user/" + userMock.getId()))
                .andExpect(status().is(200));
    }

    @Test
    @DisplayName("Test User register.")
    public void testRegister() throws Exception {
        mockMvc.perform(post("/user/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(userMock)))
                .andExpect(status().is(200))
                .andExpectAll();
    }

    @Test
    @DisplayName("Test User update.")
    public void testUpdateById() throws Exception {
        mockMvc.perform(put("/user/" + userMock.getId())
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(userMock)))
                .andExpect(status().is(200))
                .andExpectAll();
    }

    @Test
    @DisplayName("Test User delete.")
    public void testDeleteById() throws Exception {
        mockMvc.perform(delete("/user/" + userMock.getId())
                        .with(csrf()))
                .andExpect(status().is(200))
                .andExpectAll();
    }
}