package pl.wroclaw.asi.labdaybackendspring.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.wroclaw.asi.labdaybackendspring.model.Event;

@Repository
public interface EventRepository extends CrudRepository<Event, Integer> {
}
