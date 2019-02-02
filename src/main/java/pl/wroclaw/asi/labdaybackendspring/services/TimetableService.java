package pl.wroclaw.asi.labdaybackendspring.services;

import pl.wroclaw.asi.labdaybackendspring.model.Timetable;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

public interface TimetableService {
    Timetable saveOrUpdateTimetable(Timetable timetable);
    List<Timetable> findAllTimetables();
    void deleteTimetable(Integer id);
}
