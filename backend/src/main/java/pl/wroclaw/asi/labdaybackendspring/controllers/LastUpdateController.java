package pl.wroclaw.asi.labdaybackendspring.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.wroclaw.asi.labdaybackendspring.model.LastUpdate;
import pl.wroclaw.asi.labdaybackendspring.services.LastUpdateService;

import java.sql.Timestamp;

@RestController
@RequestMapping("/api")
public class LastUpdateController {

    private final LastUpdateService lastUpdateService;

    public LastUpdateController(LastUpdateService lastUpdateService) {
        this.lastUpdateService = lastUpdateService;
    }

    @GetMapping(value = "/last-update")
    public ResponseEntity<?> getLastUpdate(){
        LastUpdate lastUpdate = lastUpdateService.getLastUpdate();
        if (lastUpdate.getUpdatedAt() == null){
            lastUpdate.setUpdatedAt(new Timestamp(0));
        }
        return new ResponseEntity<>(lastUpdate, HttpStatus.OK);
    }
}
