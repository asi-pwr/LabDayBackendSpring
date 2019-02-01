package pl.wroclaw.asi.labdaybackendspring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.wroclaw.asi.labdaybackendspring.model.User;
import pl.wroclaw.asi.labdaybackendspring.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser){
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

        return userRepository.save(newUser);
    }
}
