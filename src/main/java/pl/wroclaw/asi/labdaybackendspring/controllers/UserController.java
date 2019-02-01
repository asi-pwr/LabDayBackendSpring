package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pl.wroclaw.asi.labdaybackendspring.model.User;
import pl.wroclaw.asi.labdaybackendspring.services.UserService;
import pl.wroclaw.asi.labdaybackendspring.services.ValidationErrorService;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity loginUser(@RequestParam Map<String, String> body ){
        if (body.containsKey("username") && body.containsKey("password")){
            User user = new User();
            user.setLogin(body.get("username"));
            user.setPassword(body.get("password"));
            return new ResponseEntity(userService.saveUser(user),HttpStatus.CREATED);
        }

        return new ResponseEntity("",HttpStatus.BAD_REQUEST);
    }

}
