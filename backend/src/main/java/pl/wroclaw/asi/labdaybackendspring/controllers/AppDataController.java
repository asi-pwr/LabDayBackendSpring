package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.wroclaw.asi.labdaybackendspring.model.AppData;
import pl.wroclaw.asi.labdaybackendspring.model.User;
import pl.wroclaw.asi.labdaybackendspring.services.*;

import javax.annotation.security.RolesAllowed;
import java.security.Principal;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

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

    @GetMapping(value = "/app-data")
    public ResponseEntity<?> getAppData(Principal principal){
        AppData appData;
        Set<String> roles = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());
        if (roles.contains("ROLE_USER")){
            appData = new AppData(
                    eventService.findActiveEvents(principal.getName()),
                    placeService.findAllPlaces(),
                    pathService.findActivePaths(principal.getName()),
                    timetableService.findActiveTimetables(principal.getName()),
                    speakerService.findActiveSpeakers(principal.getName())
            );
            return new ResponseEntity<>(appData, HttpStatus.OK);
        } else if (roles.contains("ROLE_GUEST")){
            appData = new AppData(
                    eventService.findAllEvents(),
                    placeService.findAllPlaces(),
                    pathService.findAllPaths(),
                    timetableService.findAllTimetables(),
                    speakerService.findAllSpeakers()
            );
            return new ResponseEntity<>(appData, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/last-update")
    public ResponseEntity<?> getLastUpdate(){
        return new ResponseEntity<>(lastUpdateService.getLastUpdate(), HttpStatus.OK);
    }
}
