package pl.wroclaw.asi.labdaybackendspring.repositories;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import pl.wroclaw.asi.labdaybackendspring.model.Timetable;

import java.sql.Timestamp;
import java.time.LocalDate;

public interface TimetableRepository extends CrudRepository<Timetable, Integer> {
    @Query(value =
            "SELECT MAX(pg_xact_commit_timestamp(xmin)) AS date FROM (" +
                    "SELECT xmin FROM event UNION " +
                    "SELECT xmin FROM timetable UNION " +
                    "SELECT xmin FROM path UNION " +
                    "SELECT xmin FROM place UNION " +
                    "SELECT xmin FROM speaker ) As timestamps "
            ,nativeQuery = true)
    Timestamp getLastUpdate();
}
