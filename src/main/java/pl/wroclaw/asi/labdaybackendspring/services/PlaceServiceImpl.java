package pl.wroclaw.asi.labdaybackendspring.services;

import org.springframework.stereotype.Service;
import pl.wroclaw.asi.labdaybackendspring.model.Place;
import pl.wroclaw.asi.labdaybackendspring.repositories.PlaceRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlaceServiceImpl implements PlaceService {

    private PlaceRepository placeRepository;

    public PlaceServiceImpl(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    @Override
    public Place saveOrUpdatePlace(Place place) {
        return placeRepository.save(place);
    }

    @Override
    public List<Place> findAllPlaces() {
        List<Place> placesList = new ArrayList<>();
        placeRepository.findAll().iterator().forEachRemaining(placesList::add);
        return placesList;
    }

    @Override
    public void deletePlace(Integer id) {
        Optional<Place> place = placeRepository.findById(id);
        if (place == null)
            throw new RuntimeException("Place with id: " + id + "does not exist");
        placeRepository.delete(place.get());
    }
}
