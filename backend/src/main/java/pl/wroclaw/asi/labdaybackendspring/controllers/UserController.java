package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pl.wroclaw.asi.labdaybackendspring.model.Role;
import pl.wroclaw.asi.labdaybackendspring.repositories.RoleRepository;
import pl.wroclaw.asi.labdaybackendspring.security.UserTokenResponse;
import pl.wroclaw.asi.labdaybackendspring.model.User;
import pl.wroclaw.asi.labdaybackendspring.security.JwtTokenProvider;
import pl.wroclaw.asi.labdaybackendspring.services.CustomUserDetailsService;
import pl.wroclaw.asi.labdaybackendspring.services.UserService;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RoleRepository roleRepository;


    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity loginUser(@RequestParam Map<String, String> body){
        if (body.containsKey("username") && body.containsKey("password")){
            User user = new User();
            user.setUsername(body.get("username"));
            user.setPassword(body.get("password"));


            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            user.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);
            return new ResponseEntity(new UserTokenResponse(jwt),HttpStatus.OK);
        }

        return new ResponseEntity("",HttpStatus.BAD_REQUEST);
    }

    @PostMapping(path = "/register")
    public ResponseEntity<?> registerUser(@RequestParam Map<String, String> body){
        User user = new User();
        if (body.containsKey("username") && body.containsKey("password")) {
            user.setUsername(body.get("username"));
            user.setPassword(body.get("password"));
            Role role = roleRepository.findByName("ROLE_USER");
            user.setRoles(Arrays.asList(role));
            userService.saveUser(user);
            return new ResponseEntity("",HttpStatus.CREATED);
        }

        return  new ResponseEntity("", HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = "/public_access")
    public ResponseEntity<?> getPublicAccess(){
        Optional<User> guest = userService.findUserByUsername("guest");
        if (guest.isPresent()){
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            guest.get().getUsername(),
                            "guest"
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);
            return new ResponseEntity(new UserTokenResponse(jwt),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}
