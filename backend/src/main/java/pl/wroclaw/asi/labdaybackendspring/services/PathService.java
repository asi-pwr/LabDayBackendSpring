package pl.wroclaw.asi.labdaybackendspring.services;

import pl.wroclaw.asi.labdaybackendspring.model.Path;

import java.util.List;

public interface PathService {
    Path saveOrUpdatePath(Path path);

    List<Path> findAllPaths();

    void deletePath(Integer id);

    List<Path> findActivePaths(Integer pathId);
}
