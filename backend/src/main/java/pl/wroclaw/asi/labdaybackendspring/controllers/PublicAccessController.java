package pl.wroclaw.asi.labdaybackendspring.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pl.wroclaw.asi.labdaybackendspring.model.PublicAccessActive;
import pl.wroclaw.asi.labdaybackendspring.repositories.PublicAccessActiveRepository;

import java.util.List;
import java.util.Optional;

@Controller
public class PublicAccessController {

    private PublicAccessActiveRepository publicAccessActiveRepository;

    public PublicAccessController(PublicAccessActiveRepository publicAccessActiveRepository) {
        this.publicAccessActiveRepository = publicAccessActiveRepository;
    }


    @Secured("ROLE_ADMIN")
    @PostMapping(value = "/admin/api/public-access")
    public ResponseEntity setPublicAccess(@RequestBody PublicAccessActive publicAccess) {
        Optional<PublicAccessActive> publicAccessActiveFromDB = publicAccessActiveRepository.findById(0);

        if (publicAccessActiveFromDB.isEmpty()) {
            publicAccess.setId(0);
            return new ResponseEntity<>(publicAccessActiveRepository.save(publicAccess), HttpStatus.OK);
        }

        publicAccessActiveFromDB.ifPresent(
                publicAccessActive -> publicAccessActive.setActive(publicAccess.isActive()));
        return new ResponseEntity<>(publicAccessActiveRepository.save(publicAccessActiveFromDB.get()), HttpStatus.OK);
    }

    @GetMapping(path = "/api/public-access-active")
    public ResponseEntity<?> isPublicAccessActive() {
        return new ResponseEntity<>(publicAccessActiveRepository.findById(0), HttpStatus.OK);
    }


}
