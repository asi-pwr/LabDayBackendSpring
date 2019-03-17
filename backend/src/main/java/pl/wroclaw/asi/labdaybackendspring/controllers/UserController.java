package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.wroclaw.asi.labdaybackendspring.model.User;
import pl.wroclaw.asi.labdaybackendspring.services.UserService;

import java.sql.Timestamp;
import java.util.Date;

import static pl.wroclaw.asi.labdaybackendspring.services.LastUpdateServiceImpl.lastUpdate;

@Secured("ROLE_ADMIN")
@Controller
@RequestMapping("/admin/api/users")
public class UserController {


    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity getUsers(){
        return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity postUserWithPath( @RequestBody User user){
        User response = userService.saveUserWithPath(user);
        lastUpdate.setUpdatedAt(String.valueOf(new Timestamp(new Date().getTime())));
        if (response != null)
            return new ResponseEntity<>(response,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
