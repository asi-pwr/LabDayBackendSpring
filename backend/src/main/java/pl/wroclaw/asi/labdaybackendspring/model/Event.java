package pl.wroclaw.asi.labdaybackendspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;


import javax.persistence.*;
import java.util.Objects;

@Entity
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

    public Event(String name,
                 String img,
                 String address,
                 String room,
                 String info,
                 String topic,
                 Integer speakerId,
                 String dor1Img,
                 String dor2Img,
                 String latitude,
                 String longitude) {
        this.name = name;
        this.img = img;
        this.address = address;
        this.room = room;
        this.info = info;
        this.topic = topic;
        this.speakerId = speakerId;
        this.dor1Img = dor1Img;
        this.dor2Img = dor2Img;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Event() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(id, event.id) &&
                Objects.equals(name, event.name) &&
                Objects.equals(img, event.img) &&
                Objects.equals(address, event.address) &&
                Objects.equals(room, event.room) &&
                Objects.equals(info, event.info) &&
                Objects.equals(topic, event.topic) &&
                Objects.equals(speakerId, event.speakerId) &&
                Objects.equals(dor1Img, event.dor1Img) &&
                Objects.equals(dor2Img, event.dor2Img) &&
                Objects.equals(latitude, event.latitude) &&
                Objects.equals(longitude, event.longitude);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, name, img, address, room, info, topic, speakerId, dor1Img, dor2Img, latitude, longitude);
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", img='" + img + '\'' +
                ", address='" + address + '\'' +
                ", room='" + room + '\'' +
                ", info='" + info + '\'' +
                ", topic='" + topic + '\'' +
                ", speakerId=" + speakerId +
                ", dor1Img='" + dor1Img + '\'' +
                ", dor2Img='" + dor2Img + '\'' +
                ", latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public Integer getSpeakerId() {
        return speakerId;
    }

    public void setSpeakerId(Integer speakerId) {
        this.speakerId = speakerId;
    }

    public String getDor1Img() {
        return dor1Img;
    }

    public void setDor1Img(String dor1Img) {
        this.dor1Img = dor1Img;
    }

    public String getDor2Img() {
        return dor2Img;
    }

    public void setDor2Img(String dor2Img) {
        this.dor2Img = dor2Img;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }
}
