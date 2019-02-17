package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import pl.wroclaw.asi.labdaybackendspring.model.Event;
import pl.wroclaw.asi.labdaybackendspring.repositories.EventRepository;
import pl.wroclaw.asi.labdaybackendspring.services.EventService;

import javax.servlet.ServletContext;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@WebAppConfiguration
public class EventControllerTest {

    @Autowired
    private WebApplicationContext wac;
    private MockMvc mockMvc;
    @Autowired
    private EventRepository eventRepository;


    @Before
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    @Test
    public void testWac(){
        ServletContext servletContext = wac.getServletContext();

        Assert.assertNotNull(servletContext);
        Assert.assertTrue(servletContext instanceof MockServletContext);
    }

    @Test
    public void getAllEventsTestStatus() throws Exception {
        String responseContentType = "application/json;charset=UTF-8";
        MvcResult mvcResult = this.mockMvc
                .perform(get("/api/events").contentType(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();
        Assert.assertEquals(responseContentType,mvcResult.getResponse().getContentType());
    }

    @Test
    public void eventsTest() throws Exception {
        String eventJson = "{\"name\": \"c\",\"img\": \"g\",\"address\": \"address\",\"room\": \"b\",\"info\": \"f\",\"topic\": \"a\",\"speaker_id\": 3,\"dor1_img\": \"h\",\"dor2_img\": \"i\",\"latitude\": \"e\",\"longitude\": \"d\"}";
        this.mockMvc
                .perform(post("/api/events")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(eventJson))
                .andExpect(status().isCreated())
                .andReturn();
        assertThat(eventRepository.findAll())
                .extracting(Event::getAddress)
                .containsExactly("address");
    }
}