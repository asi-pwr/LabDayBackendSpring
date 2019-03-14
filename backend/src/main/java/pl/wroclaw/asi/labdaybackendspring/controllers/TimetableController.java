package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pl.wroclaw.asi.labdaybackendspring.model.Timetable;
import pl.wroclaw.asi.labdaybackendspring.services.TimetableService;
import pl.wroclaw.asi.labdaybackendspring.services.ValidationErrorService;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.Date;

import static pl.wroclaw.asi.labdaybackendspring.services.LastUpdateServiceImpl.lastUpdate;

@Secured("ROLE_ADMIN")
@Service
@RequestMapping("/admin/api/timetables")
public class TimetableController {
    private final TimetableService timetableService;
    private final ValidationErrorService validationErrorService;

    @Autowired
    public TimetableController(TimetableService timetableService, ValidationErrorService validationErrorService) {
        this.timetableService = timetableService;
        this.validationErrorService = validationErrorService;
    }

    @PostMapping
    public ResponseEntity addTimetable(@Valid @RequestBody Timetable timetable, BindingResult result){

        ResponseEntity<?> errors = validationErrorService.mapValidationService(result);

        if(errors != null)
            return errors;

        lastUpdate.setUpdatedAt(new Timestamp(new Date().getTime()));

        return new ResponseEntity<>(timetableService.saveOrUpdateTimetable(timetable), HttpStatus.CREATED);

    }

    @DeleteMapping("/{timetableId}")
    public ResponseEntity<?> deleteTimetableById(@PathVariable Integer timetableId){
        timetableService.deleteTimetable(timetableId);

        lastUpdate.setUpdatedAt(new Timestamp(new Date().getTime()));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllTimetables(){
        return new ResponseEntity<>(timetableService.findAllTimetables(),HttpStatus.OK);
    }
}
