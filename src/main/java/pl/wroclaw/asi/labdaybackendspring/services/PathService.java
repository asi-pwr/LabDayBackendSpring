package pl.wroclaw.asi.labdaybackendspring.services;

import pl.wroclaw.asi.labdaybackendspring.model.Path;
import pl.wroclaw.asi.labdaybackendspring.model.Place;

import java.util.List;

public interface PathService {
    Path saveOrUpdateEvent(Path path);
    List<Path> findAllPaths();
    void deletePath(Integer id);
}
