package pl.wroclaw.asi.labdaybackendspring.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pl.wroclaw.asi.labdaybackendspring.model.Path;
import pl.wroclaw.asi.labdaybackendspring.services.PathService;
import pl.wroclaw.asi.labdaybackendspring.services.ValidationErrorService;

import javax.validation.Valid;
import java.security.Principal;
import java.sql.Timestamp;
import java.util.Date;

import static pl.wroclaw.asi.labdaybackendspring.services.LastUpdateServiceImpl.lastUpdate;

@Secured("ROLE_ADMIN")
@Controller
@RequestMapping("/admin/api/paths")
public class PathController {

    private final PathService pathService;
    private final ValidationErrorService validationErrorService;

    @Autowired
    public PathController(PathService pathService, ValidationErrorService validationErrorService) {
        this.pathService = pathService;
        this.validationErrorService = validationErrorService;
    }

    @PostMapping
    public ResponseEntity addPath(@Valid @RequestBody Path path , BindingResult result){

        ResponseEntity<?> errors = validationErrorService.mapValidationService(result);

        if(errors != null)
            return errors;

        lastUpdate.setUpdatedAt(String.valueOf(new Timestamp(new Date().getTime())));
        return new ResponseEntity<>(pathService.saveOrUpdatePath(path), HttpStatus.CREATED);

    }

    @DeleteMapping("/{pathId}")
    public ResponseEntity<?> deletePathById(@PathVariable("pathId") Integer PathId){
        pathService.deletePath(PathId);
        lastUpdate.setUpdatedAt(String.valueOf(new Timestamp(new Date().getTime())));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllPaths(){
        return new ResponseEntity<>(pathService.findAllPaths(),HttpStatus.OK);
    }

}
