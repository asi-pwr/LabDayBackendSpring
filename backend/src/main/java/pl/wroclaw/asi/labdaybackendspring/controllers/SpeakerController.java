package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pl.wroclaw.asi.labdaybackendspring.model.Speaker;
import pl.wroclaw.asi.labdaybackendspring.services.SpeakerService;
import pl.wroclaw.asi.labdaybackendspring.services.ValidationErrorService;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.Date;

import static pl.wroclaw.asi.labdaybackendspring.services.LastUpdateServiceImpl.lastUpdate;


@Secured("ROLE_ADMIN")
@Controller
@RequestMapping("/admin/api/speakers")
public class SpeakerController {

    private final SpeakerService speakerService;
    private final ValidationErrorService validationErrorService;

    @Autowired
    public SpeakerController(SpeakerService speakerService, ValidationErrorService validationErrorService) {
        this.speakerService = speakerService;
        this.validationErrorService = validationErrorService;
    }

    @PostMapping
    public ResponseEntity addSpeaker(@Valid @RequestBody Speaker speaker, BindingResult result){

        ResponseEntity<?> errors = validationErrorService.mapValidationService(result);

        if(errors != null)
            return errors;

        lastUpdate.setUpdatedAt(String.valueOf(new Timestamp(new Date().getTime())));

        return new ResponseEntity<>(speakerService.saveOrUpdateSpeaker(speaker), HttpStatus.CREATED);

    }

    @DeleteMapping("/{speakerId}")
    public ResponseEntity<?> deleteSpeakerById(@PathVariable Integer speakerId){
        speakerService.deleteSpeaker(speakerId);

        lastUpdate.setUpdatedAt(String.valueOf(new Timestamp(new Date().getTime())));
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllSpeakers(){
        return new ResponseEntity<>(speakerService.findAllSpeakers(),HttpStatus.OK);
    }
}
