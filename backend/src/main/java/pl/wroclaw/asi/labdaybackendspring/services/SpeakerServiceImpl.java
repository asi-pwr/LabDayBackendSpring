package pl.wroclaw.asi.labdaybackendspring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.wroclaw.asi.labdaybackendspring.model.Speaker;
import pl.wroclaw.asi.labdaybackendspring.repositories.SpeakerRepository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
public class SpeakerServiceImpl implements SpeakerService {

    private EventService eventService;

    private SpeakerRepository speakerRepository;

    @Autowired
    public SpeakerServiceImpl(EventService eventService, SpeakerRepository speakerRepository) {
        this.eventService = eventService;
        this.speakerRepository = speakerRepository;
    }

    @Override
    public Speaker saveOrUpdateSpeaker(Speaker speaker) {
        if (speaker.getName().equals("NaS"))
            return speakerRepository.findByName("NaS").get();

        return speakerRepository.save(speaker);
    }

    @Override
    public List<Speaker> findAllSpeakers() {
        return (List<Speaker>) speakerRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteSpeaker(Integer id) {
        Optional<Speaker> speaker = speakerRepository.findById(id);

        Speaker nas = speakerRepository.findByName("NaS").get();
        speaker.ifPresent(s ->{
            eventService.fillEventsWithSpeaker(s.getId(), nas.getId());
        });


        speaker.ifPresentOrElse(s -> {
            if (!s.getName().equals("NaS")) speakerRepository.delete(s);
        }, () -> {
            throw new RuntimeException("Speaker with id:" + id + "does not exist");
        });
    }

    @Override
    public List<Speaker> findActiveSpeakers(Integer pathId) {
        return speakerRepository.findAllActive(pathId);
    }
}
