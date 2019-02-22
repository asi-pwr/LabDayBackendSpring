package pl.wroclaw.asi.labdaybackendspring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.wroclaw.asi.labdaybackendspring.model.Speaker;
import pl.wroclaw.asi.labdaybackendspring.repositories.SpeakerRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SpeakerServiceImpl implements SpeakerService {

    private SpeakerRepository speakerRepository;

    @Autowired
    public SpeakerServiceImpl(SpeakerRepository speakerRepository) {
        this.speakerRepository = speakerRepository;
    }

    @Override
    public Speaker saveOrUpdateSpeaker(Speaker speaker) {
        return speakerRepository.save(speaker);
    }

    @Override
    public List<Speaker> findAllSpeakers() {
        return (List<Speaker>) speakerRepository.findAll();
    }

    @Override
    public void deleteSpeaker(Integer id) {
        Optional<Speaker> speaker = speakerRepository.findById(id);

        speaker.ifPresentOrElse(speakerRepository::delete, () -> {
            throw new RuntimeException("Speaker with id:" + id + "does not exist");
        });
    }

    @Override
    public List<Speaker> findActiveSpeakers() {
        return speakerRepository.findAllActive();
    }
}
