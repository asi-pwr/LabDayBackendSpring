package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pl.wroclaw.asi.labdaybackendspring.model.Event;
import pl.wroclaw.asi.labdaybackendspring.services.EventService;
import pl.wroclaw.asi.labdaybackendspring.services.ValidationErrorService;

import javax.validation.Valid;

@Controller
@RequestMapping("/api/event")
public class EventController {

    private final EventService eventService;
    private final ValidationErrorService validationErrorService;

    @Autowired
    public EventController(EventService eventService, ValidationErrorService validationErrorService) {
        this.eventService = eventService;
        this.validationErrorService = validationErrorService;
    }

    @PostMapping("/add")
    public ResponseEntity addEvent(@Valid @RequestBody Event event, BindingResult result){

        ResponseEntity<?> errors = validationErrorService.mapValidationService(result);

        if(errors != null)
            return errors;
        eventService.saveOrUpdateEvent(event);
        return new ResponseEntity<>("", HttpStatus.CREATED);

    }

    @DeleteMapping("/delete/{eventId}")
    public ResponseEntity<?> deleteEventById(@PathVariable Integer eventId){
        eventService.deleteEvent(eventId);
        return new ResponseEntity<>("Event with id: " + eventId + "was successfully deleted", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity getAllEvents(){
        return new ResponseEntity<>(eventService.findAllEvents(),HttpStatus.OK);
    }

}
