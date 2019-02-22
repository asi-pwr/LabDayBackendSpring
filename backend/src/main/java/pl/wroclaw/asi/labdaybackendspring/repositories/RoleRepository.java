package pl.wroclaw.asi.labdaybackendspring.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.wroclaw.asi.labdaybackendspring.model.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role,Integer> {
    Role findByName(String name);
}
