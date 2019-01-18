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
        List<Speaker> speakerList = new ArrayList<>();
        speakerRepository.findAll().iterator().forEachRemaining(speakerList::add);
        return speakerList;
    }

    @Override
    public void deleteSpeaker(Integer id) {
        Optional<Speaker> speaker = speakerRepository.findById(id);
        if(speaker.isEmpty())
            throw new RuntimeException("Speaker with id:" + id + "does not exist");
        speakerRepository.delete(speaker.get());
    }
}
