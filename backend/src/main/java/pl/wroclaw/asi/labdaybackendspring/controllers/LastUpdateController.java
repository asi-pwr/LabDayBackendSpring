package pl.wroclaw.asi.labdaybackendspring.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static pl.wroclaw.asi.labdaybackendspring.services.LastUpdateServiceImpl.lastUpdate;

@RestController
@RequestMapping("/api")
public class LastUpdateController {


    public LastUpdateController() {
    }

    @GetMapping(value = "/last-update")
    public ResponseEntity<?> getLastUpdate() {
        return new ResponseEntity<>(lastUpdate, HttpStatus.OK);
    }
}
