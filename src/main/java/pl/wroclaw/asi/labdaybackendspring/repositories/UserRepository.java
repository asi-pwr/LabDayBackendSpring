package pl.wroclaw.asi.labdaybackendspring.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.wroclaw.asi.labdaybackendspring.model.User;

public interface UserRepository extends CrudRepository<User,Integer> {
}
