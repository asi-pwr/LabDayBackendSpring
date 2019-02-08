package pl.wroclaw.asi.labdaybackendspring.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.wroclaw.asi.labdaybackendspring.model.Path;

import java.util.List;

public interface PathRepository extends CrudRepository<Path, Integer> {
    List<Path> findAllByActiveTrueAndPathOwner(String owner);

    List<Path> getByActiveTrue();
    Integer countDistinctByActiveTrue();
}
