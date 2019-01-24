package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.wroclaw.asi.labdaybackendspring.model.AppData;
import pl.wroclaw.asi.labdaybackendspring.services.*;

@RestController
@RequestMapping("/api")
public class AppDataController {

    private final EventService eventService;
    private final PlaceService placeService;
    private final PathService pathService;
    private final TimetableService timetableService;
    private final SpeakerService speakerService;

    private final ValidationErrorService validationErrorService;

    @Autowired
    public AppDataController(EventService eventService, PlaceService placeService, PathService pathService, TimetableService timetableService, SpeakerService speakerService, ValidationErrorService validationErrorService) {
        this.eventService = eventService;
        this.placeService = placeService;
        this.pathService = pathService;
        this.timetableService = timetableService;
        this.speakerService = speakerService;
        this.validationErrorService = validationErrorService;
    }

    @RequestMapping(value = "/app_data", method = RequestMethod.GET)
    public ResponseEntity<?> getAppData(){
        AppData appData = new AppData(
                eventService.findAllEvents(),
                placeService.findAllPlaces(),
                pathService.findAllPaths(),
                timetableService.findAllTimetables(),
                speakerService.findAllSpeakers()
        );
        return new ResponseEntity<>(appData, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/last_update")
    public ResponseEntity<?> getLastUpdate(){
        //LastUpdate lastUpdate = new LastUpdate(ZonedDateTime.now().format(DateTimeFormatter.ISO_INSTANT));
        //TODO!!
        return new ResponseEntity<>("What is last-update?", HttpStatus.OK);
    }
}
