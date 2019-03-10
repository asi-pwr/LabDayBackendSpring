package pl.wroclaw.asi.labdaybackendspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("img")
    private String img;

    @JsonProperty("address")
    private String address;

    @JsonProperty("room")
    private String room;

    @Lob
    @JsonProperty("info")
    private String info;

    @JsonProperty("topic")
    private String topic;

    @JsonProperty("speaker_id")
    private Integer speakerId;

    @JsonProperty("dor1_img")
    private String dor1Img;

    @JsonProperty("dor2_img")
    private String dor2Img;

    @JsonProperty("latitude")
    private String latitude;

    @JsonProperty("longitude")
    private String longitude;
}
