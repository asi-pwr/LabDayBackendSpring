package pl.wroclaw.asi.labdaybackendspring.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.wroclaw.asi.labdaybackendspring.model.Timetable;

public interface TimetableRepository extends CrudRepository<Timetable, Integer> {
}
