package pl.wroclaw.asi.labdaybackendspring.services;

import org.springframework.beans.factory.annotation.Autowired;
import pl.wroclaw.asi.labdaybackendspring.repositories.UserRepository;

public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
}
