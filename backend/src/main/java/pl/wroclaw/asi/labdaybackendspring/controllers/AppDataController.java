package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.wroclaw.asi.labdaybackendspring.model.AppData;
import pl.wroclaw.asi.labdaybackendspring.model.User;
import pl.wroclaw.asi.labdaybackendspring.services.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@RestController
@RequestMapping("/api")
public class AppDataController {

    private final EventService eventService;
    private final PlaceService placeService;
    private final PathService pathService;
    private final TimetableService timetableService;
    private final SpeakerService speakerService;
    private final UserService userService;

    public AppDataController(
            EventService eventService,
            PlaceService placeService,
            PathService pathService,
            TimetableService timetableService,
            SpeakerService speakerService,
            UserService userService) {
        this.eventService = eventService;
        this.placeService = placeService;
        this.pathService = pathService;
        this.timetableService = timetableService;
        this.speakerService = speakerService;

        this.userService = userService;
    }

    @Transactional
    @GetMapping(value = "/app-data")
    public ResponseEntity<?> getAppData() {
        AppData appData;
        Authentication auth = getContext().getAuthentication();
        Set<String> roles = auth
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());
        Object principal = auth.getPrincipal();
        if (roles.contains("ROLE_USER") && principal instanceof UserDetails) {
            Optional<User> user = userService.findUserByUsername(((UserDetails) principal).getUsername());
            if (user.isPresent() && user.get().getPathId() != null) {
                Integer pathId = user.get().getPathId();
                appData = new AppData(
                        eventService.findActiveEvents(pathId),
                        placeService.findAllPlaces(),
                        pathService.findActivePaths(pathId),
                        timetableService.findActiveTimetables(pathId),
                        speakerService.findActiveSpeakers(pathId)
                );
                return new ResponseEntity<>(appData, HttpStatus.OK);
            } else return new ResponseEntity<>(new AppData(Collections.emptyList(),
                    Collections.emptyList(),
                    Collections.emptyList(),
                    Collections.emptyList(),
                    Collections.emptyList()), HttpStatus.OK);
        } else if (roles.contains("ROLE_GUEST") || roles.contains("ROLE_ADMIN")) {
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
}
