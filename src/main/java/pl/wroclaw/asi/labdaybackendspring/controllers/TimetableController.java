package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pl.wroclaw.asi.labdaybackendspring.model.Timetable;
import pl.wroclaw.asi.labdaybackendspring.services.TimetableService;
import pl.wroclaw.asi.labdaybackendspring.services.ValidationErrorService;

import javax.validation.Valid;

@Service
@RequestMapping("/api/timetables")
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
        timetableService.saveOrUpdateTimetable(timetable);
        return new ResponseEntity<>("Timetable successfully created", HttpStatus.CREATED);

    }

    @DeleteMapping("/{timetableId}")
    public ResponseEntity<?> deleteTimetableById(@PathVariable Integer timetableId){
        timetableService.deleteTimetable(timetableId);
        return new ResponseEntity<>("Timetable with id: " + timetableId + "was successfully deleted", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllTimetables(){
        return new ResponseEntity<>(timetableService.findAllTimetables(),HttpStatus.OK);
    }
}
