package pl.wroclaw.asi.labdaybackendspring.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.wroclaw.asi.labdaybackendspring.model.Event;
import pl.wroclaw.asi.labdaybackendspring.model.Timetable;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends CrudRepository<Event, Integer> {
    void delete(Event entity);
    Iterable<Event> findAll();

    @Query(value =
            "SELECT event.* " +
            "FROM event " +
                "INNER JOIN timetable ON event.id = timetable.event_id " +
                "INNER JOIN path ON path.id = timetable.path_id " +
            "WHERE path.active = TRUE AND path.id = ?1",
            nativeQuery = true)
    List<Event> findAllActive(Integer pathId);
}

