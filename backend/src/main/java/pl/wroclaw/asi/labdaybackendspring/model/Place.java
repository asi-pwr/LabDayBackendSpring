package pl.wroclaw.asi.labdaybackendspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Place {
    public enum Type {
        NOT_SET(0),
        INFO(1),
        FOOD(2),
        REST(3);

        private final int type;

        private Type(final int type) {
            this.type = type;
        }

        @JsonValue
        public int toInt() {
            return this.type;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("type")
    private Type type;

    @JsonProperty("name")
    private String name;

    @Lob
    @JsonProperty("info")
    private String info;

    @JsonProperty("img")
    private String img;

    @JsonProperty("latitude")
    private String latitude;

    @JsonProperty("longitude")
    private String longitude;

    public Place(Type type, String name, String info, String img, String latitude, String longitude) {
        this.type = type;
        this.name = name;
        this.info = info;
        this.img = img;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Place() {
    }

    @Override
    public String toString() {
        return "Place{" +
                "id=" + id +
                ", type=" + type +
                ", name='" + name + '\'' +
                ", info='" + info + '\'' +
                ", img='" + img + '\'' +
                ", latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Place place = (Place) o;
        return Objects.equals(id, place.id) &&
                type == place.type &&
                Objects.equals(name, place.name) &&
                Objects.equals(info, place.info) &&
                Objects.equals(img, place.img) &&
                Objects.equals(latitude, place.latitude) &&
                Objects.equals(longitude, place.longitude);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, type, name, info, img, latitude, longitude);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
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
