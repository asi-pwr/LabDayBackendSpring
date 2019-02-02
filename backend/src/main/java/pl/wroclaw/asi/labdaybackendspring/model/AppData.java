package pl.wroclaw.asi.labdaybackendspring.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class AppData {

    @JsonProperty("events")
    private List<Event> events;

    @JsonProperty("map_others")
    private List<Place> mapOthers;

    @JsonProperty("paths")
    private List<Path> paths;

    @JsonProperty("timetables")
    private List<Timetable> timetables;

    @JsonProperty("speakers")
    private List<Speaker> speakers;

    public AppData(List<Event> events, List<Place> mapOthers, List<Path> paths, List<Timetable> timetables, List<Speaker> speakers) {
        this.events = events;
        this.mapOthers = mapOthers;
        this.paths = paths;
        this.timetables = timetables;
        this.speakers = speakers;
    }
}
