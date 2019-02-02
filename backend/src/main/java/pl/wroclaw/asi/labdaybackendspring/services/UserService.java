package pl.wroclaw.asi.labdaybackendspring.services;

import pl.wroclaw.asi.labdaybackendspring.model.User;

import java.util.Optional;

public interface UserService {
    public User saveUser(User newUser);
    public Optional<User> findUserByUsername(String username);
}
