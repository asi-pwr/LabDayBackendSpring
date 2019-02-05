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
import java.security.Principal;

@Controller
@RequestMapping("/api/paths")
public class PathController {

    private final PathService pathService;
    private final ValidationErrorService validationErrorService;

    @Autowired
    public PathController(PathService pathService, ValidationErrorService validationErrorService) {
        this.pathService = pathService;
        this.validationErrorService = validationErrorService;
    }

    @PostMapping
    public ResponseEntity addPath(@Valid @RequestBody Path path, Principal principal, BindingResult result){

        ResponseEntity<?> errors = validationErrorService.mapValidationService(result);

        if(errors != null)
            return errors;
        path.setPathOwner(principal.getName());
        pathService.saveOrUpdatePath(path);
        return new ResponseEntity<>("Path successfully created", HttpStatus.CREATED);

    }

    @DeleteMapping("/{pathId}")
    public ResponseEntity<?> deletePathById(@PathVariable Integer PathId){
        pathService.deletePath(PathId);
        return new ResponseEntity<>("Path with id: " + PathId + "was successfully deleted", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllPaths(){
        return new ResponseEntity<>(pathService.findAllPaths(),HttpStatus.OK);
    }

}
