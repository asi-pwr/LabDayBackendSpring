package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.wroclaw.asi.labdaybackendspring.model.AppData;
import pl.wroclaw.asi.labdaybackendspring.model.User;
import pl.wroclaw.asi.labdaybackendspring.services.*;

import java.security.Principal;

@RestController
@RequestMapping("/api")
public class AppDataController {

    private final EventService eventService;
    private final PlaceService placeService;
    private final PathService pathService;
    private final TimetableService timetableService;
    private final SpeakerService speakerService;
    private final LastUpdateService lastUpdateService;

    private final ValidationErrorService validationErrorService;

    public AppDataController(
            EventService eventService,
            PlaceService placeService,
            PathService pathService,
            TimetableService timetableService,
            SpeakerService speakerService,
            LastUpdateService lastUpdateService,
            ValidationErrorService validationErrorService) {
        this.eventService = eventService;
        this.placeService = placeService;
        this.pathService = pathService;
        this.timetableService = timetableService;
        this.speakerService = speakerService;
        this.lastUpdateService = lastUpdateService;
        this.validationErrorService = validationErrorService;
    }

    @RequestMapping(value = "/app_data", method = RequestMethod.GET)
    public ResponseEntity<?> getAppData(Principal principal){
        System.out.println(principal.getName());
        AppData appData = new AppData(
                eventService.findActiveEvents(principal.getName()),
                placeService.findAllPlaces(),
                pathService.findActivePaths(principal.getName()),
                timetableService.findActiveTimetables(principal.getName()),
                speakerService.findActiveSpeakers(principal.getName())
        );
        return new ResponseEntity<>(appData, HttpStatus.OK);
    }

    @RequestMapping(value = "/last_update")
    public ResponseEntity<?> getLastUpdate(){
        return new ResponseEntity<>(lastUpdateService.getLastUpdate(), HttpStatus.OK);
    }
}
