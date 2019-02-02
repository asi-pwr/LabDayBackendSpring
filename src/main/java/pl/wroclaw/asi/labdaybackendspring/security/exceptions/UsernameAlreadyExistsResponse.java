package pl.wroclaw.asi.labdaybackendspring.security.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UsernameAlreadyExistsResponse {
    private String responseError;
}
