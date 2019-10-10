package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.wroclaw.asi.labdaybackendspring.model.Role;
import pl.wroclaw.asi.labdaybackendspring.repositories.PublicAccessActiveRepository;
import pl.wroclaw.asi.labdaybackendspring.repositories.RoleRepository;
import pl.wroclaw.asi.labdaybackendspring.security.UserTokenResponse;
import pl.wroclaw.asi.labdaybackendspring.model.User;
import pl.wroclaw.asi.labdaybackendspring.security.JwtTokenProvider;
import pl.wroclaw.asi.labdaybackendspring.services.UserService;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class LoginController {

    private UserService userService;
    private JwtTokenProvider tokenProvider;
    private AuthenticationManager authenticationManager;
    private RoleRepository roleRepository;
    private PublicAccessActiveRepository publicAccessActiveRepository;


    public LoginController(UserService userService,
                           JwtTokenProvider tokenProvider,
                           AuthenticationManager authenticationManager,
                           RoleRepository roleRepository,
                           PublicAccessActiveRepository publicAccessActiveRepository) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
        this.publicAccessActiveRepository = publicAccessActiveRepository;
    }

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity loginUser(@RequestParam Map<String, String> body) {
        if (body.containsKey("username") && body.containsKey("password")) {
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
            if (!user.getUsername().equals("guest"))
                return new ResponseEntity(new UserTokenResponse(jwt), HttpStatus.OK);
        }

        return new ResponseEntity("", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(path = "/register")
    public ResponseEntity<?> registerUser(@RequestParam Map<String, String> body) {
        User user = new User();
        if (body.containsKey("username") && body.containsKey("password")) {
            user.setUsername(body.get("username"));
            user.setPassword(body.get("password"));
            Role role = roleRepository.findByName("ROLE_USER");
            user.setRoles(Arrays.asList(role));
            return new ResponseEntity(userService.saveUser(user), HttpStatus.CREATED);
        }

        return new ResponseEntity("", HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = "/public-access")
    public ResponseEntity<?> getPublicAccess() {
        Optional<User> guest = userService.findUserByUsername("guest");
        if (guest.isPresent() && publicAccessActiveRepository.findById(0).get().isActive()) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            guest.get().getUsername(),
                            "guest"
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);
            return new ResponseEntity(new UserTokenResponse(jwt), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


}
