package pl.wroclaw.asi.labdaybackendspring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.wroclaw.asi.labdaybackendspring.model.Event;
import pl.wroclaw.asi.labdaybackendspring.repositories.EventRepository;

import java.util.ArrayList;
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
        if (!event.isPresent())
            throw new RuntimeException("Event with id: " + id + "does not exist");
        eventRepository.delete(event.get());
    }

    @Override
    public List<Event> findActiveEvents( ) {
        return eventRepository.findAllActive();
    }

}
