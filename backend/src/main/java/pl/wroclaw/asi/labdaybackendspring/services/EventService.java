package pl.wroclaw.asi.labdaybackendspring.services;

import pl.wroclaw.asi.labdaybackendspring.model.Event;

import java.util.List;

public interface EventService {
    Event saveOrUpdateEvent(Event event);
    List<Event> findAllEvents();
    void deleteEvent(Integer id);
    List<Event> findActiveEvents(String owner);
}
