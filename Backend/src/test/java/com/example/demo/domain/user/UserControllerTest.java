package com.example.demo.domain.user;

import com.example.demo.core.security.JWTAuthenticationFilter;
import com.example.demo.core.security.helpers.JwtProperties;
import com.example.demo.domain.myListEntry.MyListEntryService;
import com.example.demo.domain.myListEntry.dto.MyListEntryMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest
@AutoConfigureMockMvc
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
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Should List All User When making GET request to ednpoint")
    public void shouldListAllUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/user/"))
                .andExpect(MockMvcResultMatchers.status().is(401));
    }
}