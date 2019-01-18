package pl.wroclaw.asi.labdaybackendspring.services;

import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

public interface ValidationErrorService {
    ResponseEntity<?> mapValidationService(BindingResult result);
}
