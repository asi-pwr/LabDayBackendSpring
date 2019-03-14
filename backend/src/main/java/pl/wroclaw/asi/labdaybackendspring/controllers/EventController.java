package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pl.wroclaw.asi.labdaybackendspring.model.Event;
import pl.wroclaw.asi.labdaybackendspring.services.EventService;
import pl.wroclaw.asi.labdaybackendspring.services.ValidationErrorService;

import javax.validation.Valid;

import java.sql.Timestamp;
import java.util.Date;

import static pl.wroclaw.asi.labdaybackendspring.services.LastUpdateServiceImpl.lastUpdate;

@Secured("ROLE_ADMIN")
@Controller
@RequestMapping("/admin/api/events")
public class EventController {

    private final EventService eventService;
    private final ValidationErrorService validationErrorService;

    @Autowired
    public EventController(EventService eventService, ValidationErrorService validationErrorService) {
        this.eventService = eventService;
        this.validationErrorService = validationErrorService;
    }

    @PostMapping
    public ResponseEntity addEvent(@Valid @RequestBody Event event, BindingResult result){

        ResponseEntity<?> errors = validationErrorService.mapValidationService(result);

        if(errors != null)
            return errors;

        lastUpdate.setUpdatedAt(new Timestamp(new Date().getTime()));
        return new ResponseEntity<>(eventService.saveOrUpdateEvent(event), HttpStatus.CREATED);

    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> deleteEventById(@PathVariable Integer eventId){
        eventService.deleteEvent(eventId);
        lastUpdate.setUpdatedAt(new Timestamp(new Date().getTime()));
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllEvents(){
        return new ResponseEntity<>(eventService.findAllEvents(),HttpStatus.OK);
    }

}
