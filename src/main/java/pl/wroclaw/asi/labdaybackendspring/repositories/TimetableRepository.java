package pl.wroclaw.asi.labdaybackendspring.repositories;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import pl.wroclaw.asi.labdaybackendspring.model.Timetable;

import java.sql.Timestamp;
import java.time.LocalDate;

public interface TimetableRepository extends CrudRepository<Timetable, Integer> {

}
