package pl.wroclaw.asi.labdaybackendspring.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
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


}
