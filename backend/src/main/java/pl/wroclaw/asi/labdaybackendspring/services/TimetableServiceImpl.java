package pl.wroclaw.asi.labdaybackendspring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.wroclaw.asi.labdaybackendspring.model.Timetable;
import pl.wroclaw.asi.labdaybackendspring.repositories.TimetableRepository;

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
        return (List<Timetable>) timetableRepository.findAll();
    }

    @Override
    public void deleteTimetable(Integer id) {
        Optional<Timetable> timetable = timetableRepository.findById(id);

        timetable.ifPresentOrElse(timetableRepository::delete, () -> {
            throw new RuntimeException("Timetable with id: " + id + "does not exists");
        });
    }

    @Override
    public List<Timetable> findActiveTimetables(Integer pathId) {
        return timetableRepository.findAllActive(pathId);
    }

}
