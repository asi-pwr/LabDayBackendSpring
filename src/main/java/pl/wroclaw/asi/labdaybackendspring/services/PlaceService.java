package pl.wroclaw.asi.labdaybackendspring.services;

import pl.wroclaw.asi.labdaybackendspring.model.Event;
import pl.wroclaw.asi.labdaybackendspring.model.Place;

import java.util.List;

public interface PlaceService {
    Place saveOrUpdatePlace(Place place);
    List<Place> findAllPlaces();
    void deletePlace(Integer id);
}
