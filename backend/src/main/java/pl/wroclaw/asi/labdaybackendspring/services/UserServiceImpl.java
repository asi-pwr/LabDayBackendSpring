package pl.wroclaw.asi.labdaybackendspring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.wroclaw.asi.labdaybackendspring.model.User;
import pl.wroclaw.asi.labdaybackendspring.repositories.UserRepository;
import pl.wroclaw.asi.labdaybackendspring.security.exceptions.UsernameAlreadyExistsException;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User saveUser(User newUser) {
        Optional<User> tmp = userRepository.findByUsername(newUser.getUsername());
        tmp.ifPresent((user) -> {
            throw new UsernameAlreadyExistsException("Username " + newUser.getUsername() + " already exists");
        });
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        return userRepository.save(newUser);

        //TODO:Should username be unique?
    }

    public Optional<User> findUserByUsername(String username){
        return userRepository.findByUsername(username);
    }
}
