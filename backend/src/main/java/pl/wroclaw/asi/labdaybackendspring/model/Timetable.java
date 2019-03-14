package pl.wroclaw.asi.labdaybackendspring.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.lang.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("path_id")
    @NonNull
    private Integer pathId;

    @JsonProperty("event_id")
    private Integer eventId;

    @JsonProperty("time_start")
    private Integer timeStart;

    @JsonProperty("time_end")
    private Integer timeEnd;


    public Timetable(Integer pathId, Integer eventId, Integer timeStart, Integer timeEnd) {
        this.pathId = pathId;
        this.eventId = eventId;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
    }

    public Timetable() {
    }

    @Override
    public String toString() {
        return "Timetable{" +
                "id=" + id +
                ", pathId=" + pathId +
                ", eventId=" + eventId +
                ", timeStart=" + timeStart +
                ", timeEnd=" + timeEnd +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Timetable timetable = (Timetable) o;
        return Objects.equals(id, timetable.id) &&
                Objects.equals(pathId, timetable.pathId) &&
                Objects.equals(eventId, timetable.eventId) &&
                Objects.equals(timeStart, timetable.timeStart) &&
                Objects.equals(timeEnd, timetable.timeEnd);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, pathId, eventId, timeStart, timeEnd);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPathId() {
        return pathId;
    }

    public void setPathId(Integer pathId) {
        this.pathId = pathId;
    }

    public Integer getEventId() {
        return eventId;
    }

    public void setEventId(Integer eventId) {
        this.eventId = eventId;
    }

    public Integer getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(Integer timeStart) {
        this.timeStart = timeStart;
    }

    public Integer getTimeEnd() {
        return timeEnd;
    }

    public void setTimeEnd(Integer timeEnd) {
        this.timeEnd = timeEnd;
    }
}
