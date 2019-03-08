package pl.wroclaw.asi.labdaybackendspring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.wroclaw.asi.labdaybackendspring.model.Path;
import pl.wroclaw.asi.labdaybackendspring.repositories.PathRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PathServiceImpl implements PathService {

    private PathRepository pathRepository;

    @Autowired
    public PathServiceImpl(PathRepository pathRepository) {
        this.pathRepository = pathRepository;
    }

    @Override
    public Path saveOrUpdatePath(Path path) {
        return pathRepository.save(path);
    }

    @Override
    public List<Path> findAllPaths() {
        return (List<Path>) pathRepository.findAll();
    }

    @Override
    public void deletePath(Integer id) {
        Optional<Path> path = pathRepository.findById(id);

        path.ifPresentOrElse(pathRepository::delete, () -> {
            throw new RuntimeException("path with id: " + id + "does not exist");
        });
    }

    @Override
    public List<Path> findActivePaths(Integer pathId) {
        return pathRepository.findAllByActiveTrueAndId(pathId);
    }
}
