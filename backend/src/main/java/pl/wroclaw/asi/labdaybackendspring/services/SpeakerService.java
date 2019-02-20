package pl.wroclaw.asi.labdaybackendspring.services;

import pl.wroclaw.asi.labdaybackendspring.model.Speaker;

import java.util.List;

public interface SpeakerService {
    Speaker saveOrUpdateSpeaker(Speaker speaker);
    List<Speaker> findAllSpeakers();
    void deleteSpeaker(Integer id);
    List<Speaker> findActiveSpeakers();

}
