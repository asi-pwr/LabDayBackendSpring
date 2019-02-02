package pl.wroclaw.asi.labdaybackendspring.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.wroclaw.asi.labdaybackendspring.model.Place;

public interface PlaceRepository extends CrudRepository<Place, Integer> {

}
