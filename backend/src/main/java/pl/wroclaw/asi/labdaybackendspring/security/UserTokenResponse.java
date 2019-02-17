package pl.wroclaw.asi.labdaybackendspring.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserTokenResponse {
    String token;
}
