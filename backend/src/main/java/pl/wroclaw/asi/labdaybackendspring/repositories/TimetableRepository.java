package pl.wroclaw.asi.labdaybackendspring.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import pl.wroclaw.asi.labdaybackendspring.model.Timetable;

import java.util.List;

public interface TimetableRepository extends CrudRepository<Timetable, Integer> {

    @Query(value =
            "SELECT timetable.* " +
                    "FROM timetable INNER JOIN path ON path.id = timetable.path_id " +
                    "WHERE path.active = TRUE and path.id = ?1",
            nativeQuery = true)
    List<Timetable> findAllActive(Integer pathId);

}
