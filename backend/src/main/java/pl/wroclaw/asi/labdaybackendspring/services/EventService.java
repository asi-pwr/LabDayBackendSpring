package pl.wroclaw.asi.labdaybackendspring.services;

import pl.wroclaw.asi.labdaybackendspring.model.Event;
import pl.wroclaw.asi.labdaybackendspring.model.Speaker;

import java.util.List;

public interface EventService {
    Event saveOrUpdateEvent(Event event);

    List<Event> findAllEvents();

    void deleteEvent(Integer id);

    List<Event> findActiveEvents(Integer pathId);

    void fillEventsWithSpeaker(Integer speakerId, Integer notASpeakerId);
}
