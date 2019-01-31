package pl.wroclaw.asi.labdaybackendspring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.wroclaw.asi.labdaybackendspring.model.Timetable;
import pl.wroclaw.asi.labdaybackendspring.repositories.TimetableRepository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TimetableServiceImpl implements TimetableService {

    private TimetableRepository timetableRepository;
    @Autowired
    public TimetableServiceImpl(TimetableRepository timetableRepository) {
        this.timetableRepository = timetableRepository;
    }

    @Override
    public Timetable saveOrUpdateTimetable(Timetable timetable) {
        return timetableRepository.save(timetable);
    }

    @Override
    public List<Timetable> findAllTimetables() {
        List<Timetable> timetableList = new ArrayList<>();
        timetableRepository.findAll().iterator().forEachRemaining(timetableList::add);
        return timetableList;
    }

    @Override
    public void deleteTimetable(Integer id) {
        Optional<Timetable> timetable = timetableRepository.findById(id);
        if(!timetable.isPresent())
            throw new RuntimeException("Timetable with id: " + id + "does not exists");
        timetableRepository.delete(timetable.get());
    }

}
