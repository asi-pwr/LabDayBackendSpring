package pl.wroclaw.asi.labdaybackendspring.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@Data
@Builder
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
}
