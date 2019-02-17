package pl.wroclaw.asi.labdaybackendspring.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import pl.wroclaw.asi.labdaybackendspring.model.Event;
import pl.wroclaw.asi.labdaybackendspring.model.Speaker;

import java.util.List;

public interface SpeakerRepository extends CrudRepository<Speaker, Integer> {

    @Query(value =
            "SELECT speaker.* " +
            "FROM speaker " +
                    "INNER JOIN event ON event.speaker_id = speaker.id " +
                    "INNER JOIN timetable ON event.id = timetable.event_id " +
                    "INNER JOIN path ON path.id = timetable.path_id " +
            "WHERE path.active = TRUE",
            nativeQuery = true)
    List<Speaker> findAllActive();
}
