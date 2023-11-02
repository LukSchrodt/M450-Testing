package com.example.demo.domain.myListEntry;

import com.example.demo.domain.myListEntry.dto.MyListEntryMapper;
import com.example.demo.domain.myListEntry.dto.Priority;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserService;
import com.example.demo.domain.user.dto.UserMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
@WithMockUser(username = "admin@example.com", password = "007", authorities = {"MY_LIST_ENTRY_READ", "MY_LIST_ENTRY_CREATE"})
@AutoConfigureMockMvc(addFilters = false)
class MyListEntryControllerTest {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private MyListEntryService myListEntryService;
    @MockBean
    private MyListEntryMapper myListEntryMapper;
    @MockBean
    private UserService userService;
    @MockBean
    private UserMapper userMapper;
    @MockBean
    private User user;

    User newUser;
    Priority newPriority;
    LocalDate date = LocalDate.now();
    MyListEntry mockMyListEntry = new MyListEntry(UUID.randomUUID(), "Title", "My new example text", date, newPriority, newUser);

    public String createJsonString() {
        JSONObject jsonListEntry = new JSONObject();
        jsonListEntry.put("id", "");
        jsonListEntry.put("title", "Title");
        jsonListEntry.put("text", "My new example text");
        jsonListEntry.put("date", "");
        jsonListEntry.put("priority", "");
        jsonListEntry.put("user", "user");
        return jsonListEntry.toString();
    }

    @Test
    @DisplayName("Test get All user enpoint.")
    public void testGetById() throws Exception {
        mockMvc.perform(get("/my_lists/" + mockMyListEntry.getId()))
                .andExpect(status().is(200));
    }

    @Test
    @DisplayName("Test get All user enpoint.")
    public void testGetByPriority() throws Exception {
        mockMvc.perform(get("/my_lists/priority/" + mockMyListEntry.getPriority()))
                .andExpect(status().is(200));
    }

    @Test
    @DisplayName("Test get All user enpoint.")
    public void testGetAll() throws Exception {
        mockMvc.perform(get("/my_lists/"))
                .andExpect(status().is(200));
    }

    @Test
    @DisplayName("Test get All user enpoint.")
    public void testGetAllByUser() throws Exception {
        mockMvc.perform(get("/my_lists/mylist"))
                .andExpect(status().is(200));
    }

    @Test
    @DisplayName("Test get All user enpoint.")
    public void testGetAllSorted() throws Exception {
        mockMvc.perform(get("/my_lists/sorted"))
                .andExpect(status().is(200));
    }

    @Test
    @DisplayName("Test User register.")
    public void testCreateListEntry() throws Exception {
        mockMvc.perform(post("/my_lists/")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON).content(createJsonString()))
                .andExpect(status().is(405))
                .andExpectAll();
    }

    @Test
    @DisplayName("Test User register.")
    public void testUpdateEntryList() throws Exception {
        mockMvc.perform(put("/my_lists/" + mockMyListEntry.getId())
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(mockMyListEntry)))
                .andExpect(status().is(405))
                .andExpectAll();
    }

    @Test
    @DisplayName("Test User register.")
    public void testDeleteById() throws Exception {
        mockMvc.perform(delete("/my_lists/" + mockMyListEntry.getId())
                        .with(csrf()))
                .andExpect(status().is(204))
                .andExpectAll();
    }

}