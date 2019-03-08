package pl.wroclaw.asi.labdaybackendspring.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.wroclaw.asi.labdaybackendspring.model.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Integer> {
    Optional<User> findByUsername(String username);
    User getById(Integer id);
    Iterable<User> findAllByOrderById();
}
