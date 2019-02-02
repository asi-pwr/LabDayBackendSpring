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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser){
        try {
            Optional<User> tmp = userRepository.findByUsername(newUser.getUsername());
            if (tmp.isPresent())
                throw new UsernameAlreadyExistsException("Username " + newUser.getUsername() + " already exists");
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setUsername(newUser.getUsername());
            return userRepository.save(newUser);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username" + newUser.getUsername() + "already exists");
        }
        //TODO:Should username be unique?
    }


    public Optional<User> findUserByUsername(String username){
        return userRepository.findByUsername(username);
    }
}
