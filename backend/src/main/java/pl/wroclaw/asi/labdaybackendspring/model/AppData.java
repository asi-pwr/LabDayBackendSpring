package pl.wroclaw.asi.labdaybackendspring.model;


import com.fasterxml.jackson.annotation.JsonProperty;


import java.util.List;
import java.util.Objects;

public class AppData {

    @JsonProperty("paths")
    private List<Path> paths;

    @JsonProperty("timetables")
    private List<Timetable> timetables;

    @JsonProperty("events")
    private List<Event> events;

    @JsonProperty("speakers")
    private List<Speaker> speakers;

    @JsonProperty("places")
    private List<Place> mapOthers;

    public AppData(List<Event> events, List<Place> mapOthers, List<Path> paths, List<Timetable> timetables, List<Speaker> speakers) {
        this.events = events;
        this.mapOthers = mapOthers;
        this.paths = paths;
        this.timetables = timetables;
        this.speakers = speakers;
    }

    public AppData() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AppData appData = (AppData) o;
        return Objects.equals(paths, appData.paths) &&
                Objects.equals(timetables, appData.timetables) &&
                Objects.equals(events, appData.events) &&
                Objects.equals(speakers, appData.speakers) &&
                Objects.equals(mapOthers, appData.mapOthers);
    }

    @Override
    public int hashCode() {

        return Objects.hash(paths, timetables, events, speakers, mapOthers);
    }

    @Override
    public String toString() {
        return "AppData{" +
                "paths=" + paths +
                ", timetables=" + timetables +
                ", events=" + events +
                ", speakers=" + speakers +
                ", mapOthers=" + mapOthers +
                '}';
    }

    public List<Path> getPaths() {
        return paths;
    }

    public void setPaths(List<Path> paths) {
        this.paths = paths;
    }

    public List<Timetable> getTimetables() {
        return timetables;
    }

    public void setTimetables(List<Timetable> timetables) {
        this.timetables = timetables;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public List<Speaker> getSpeakers() {
        return speakers;
    }

    public void setSpeakers(List<Speaker> speakers) {
        this.speakers = speakers;
    }

    public List<Place> getMapOthers() {
        return mapOthers;
    }

    public void setMapOthers(List<Place> mapOthers) {
        this.mapOthers = mapOthers;
    }
}
