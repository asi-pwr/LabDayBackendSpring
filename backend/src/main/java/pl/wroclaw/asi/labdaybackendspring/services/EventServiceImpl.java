package pl.wroclaw.asi.labdaybackendspring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.wroclaw.asi.labdaybackendspring.model.Event;
import pl.wroclaw.asi.labdaybackendspring.model.Speaker;
import pl.wroclaw.asi.labdaybackendspring.repositories.EventRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    private EventRepository eventRepository;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public Event saveOrUpdateEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public List<Event> findAllEvents() {
        return (List<Event>) eventRepository.findAll();
    }

    @Override
    public void deleteEvent(Integer id) {
        Optional<Event> event = eventRepository.findById(id);
        event.ifPresentOrElse(eventRepository::delete, () -> {
            throw new RuntimeException("Event with id: " + id + "does not exist");
        });
    }

    @Override
    public List<Event> findActiveEvents(Integer pathId) {
        return eventRepository.findAllActive(pathId);
    }

    @Override
    public void fillEventsWithSpeaker(Integer speakerId, Integer notASpeakerId) {
        List<Event> events = (List<Event>) eventRepository.findAll();
        events.forEach(event -> {
                if (event.getSpeakerId().equals(speakerId)){
                    event.setSpeakerId(notASpeakerId);
                    eventRepository.save(event);
                }
        });
    }

}
