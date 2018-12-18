package pl.wroclaw.asi.labdaybackendspring.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private int id;

    @JsonProperty("path_id")
    @NonNull
    private int pathId;

    @JsonProperty("event_id")
    private int eventId;

    @JsonProperty("time_start")
    private int timeStart;

    @JsonProperty("time_end")
    private int timeEnd;
}