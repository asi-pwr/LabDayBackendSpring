package pl.wroclaw.asi.labdaybackendspring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.wroclaw.asi.labdaybackendspring.model.Path;
import pl.wroclaw.asi.labdaybackendspring.repositories.PathRepository;

import java.util.ArrayList;
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
        List<Path> pathList = new ArrayList<>();
        pathRepository.findAll().iterator().forEachRemaining(pathList::add);
        return pathList;
    }

    @Override
    public void deletePath(Integer id) {
        Optional<Path> path = pathRepository.findById(id);
        if(!path.isPresent())
            throw new RuntimeException("path with id: " + id + "does not exist");
        pathRepository.delete(path.get());

    }

    @Override
    public List<Path> findActivePaths() {
        return pathRepository.findAllByActiveTrue();
    }
}
