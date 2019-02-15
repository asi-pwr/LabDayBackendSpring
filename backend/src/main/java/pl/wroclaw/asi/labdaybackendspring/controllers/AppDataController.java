package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.wroclaw.asi.labdaybackendspring.model.AppData;
import pl.wroclaw.asi.labdaybackendspring.model.LastUpdate;
import pl.wroclaw.asi.labdaybackendspring.services.*;

import java.security.Principal;
import java.sql.Timestamp;
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


    public AppDataController(
            EventService eventService,
            PlaceService placeService,
            PathService pathService,
            TimetableService timetableService,
            SpeakerService speakerService,
            LastUpdateService lastUpdateService) {
        this.eventService = eventService;
        this.placeService = placeService;
        this.pathService = pathService;
        this.timetableService = timetableService;
        this.speakerService = speakerService;
        this.lastUpdateService = lastUpdateService;
    }

    @Transactional
    @GetMapping(value = "/app-data")
    public ResponseEntity<?> getAppData(){
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
                    eventService.findActiveEvents(),
                    placeService.findAllPlaces(),
                    pathService.findActivePaths(),
                    timetableService.findActiveTimetables(),
                    speakerService.findActiveSpeakers()
            );
            return new ResponseEntity<>(appData, HttpStatus.OK);
        } else if (roles.contains("ROLE_GUEST") || roles.contains("ROLE_ADMIN")){
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
        LastUpdate lastUpdate = lastUpdateService.getLastUpdate();
        if (lastUpdate.getUpdatedAt() == null){
            lastUpdate.setUpdatedAt(new Timestamp(0));
        }
        return new ResponseEntity<>(lastUpdate, HttpStatus.OK);
    }
}
