package pl.wroclaw.asi.labdaybackendspring.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pl.wroclaw.asi.labdaybackendspring.model.Path;
import pl.wroclaw.asi.labdaybackendspring.services.PathService;
import pl.wroclaw.asi.labdaybackendspring.services.ValidationErrorService;

import javax.validation.Valid;

@Controller
@RequestMapping("/api")
public class PathController {

    private final PathService pathService;
    private final ValidationErrorService validationErrorService;

    @Autowired
    public PathController(PathService pathService, ValidationErrorService validationErrorService) {
        this.pathService = pathService;
        this.validationErrorService = validationErrorService;
    }

    @PostMapping("/path/add")
    public ResponseEntity addPath(@Valid @RequestBody Path path, BindingResult result){

        ResponseEntity<?> errors = validationErrorService.mapValidationService(result);

        if(errors != null)
            return errors;
        pathService.saveOrUpdatePath(path);
        return new ResponseEntity<>("Path successfully created", HttpStatus.CREATED);

    }

    @DeleteMapping("/path/delete/{pathId}")
    public ResponseEntity<?> deletePathById(@PathVariable Integer PathId){
        pathService.deletePath(PathId);
        return new ResponseEntity<>("Path with id: " + PathId + "was successfully deleted", HttpStatus.OK);
    }

    @GetMapping("/paths")
    public ResponseEntity getAllPaths(){
        return new ResponseEntity<>(pathService.findAllPaths(),HttpStatus.OK);
    }

}
