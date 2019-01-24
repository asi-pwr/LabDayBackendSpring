package pl.wroclaw.asi.labdaybackendspring.services;

import pl.wroclaw.asi.labdaybackendspring.model.Event;

import java.util.List;
import java.util.Optional;

public interface EventService {
    Event saveOrUpdateEvent(Event event);
    List<Event> findAllEvents();
    void deleteEvent(Integer id);
}
