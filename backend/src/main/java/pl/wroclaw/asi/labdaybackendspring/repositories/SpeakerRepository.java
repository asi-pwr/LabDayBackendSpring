package pl.wroclaw.asi.labdaybackendspring.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.wroclaw.asi.labdaybackendspring.model.Speaker;

public interface SpeakerRepository extends CrudRepository<Speaker, Integer> {
}
