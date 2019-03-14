package pl.wroclaw.asi.labdaybackendspring.model;

import com.fasterxml.jackson.annotation.*;


import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "path")
public class Path {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("name")
    private String name;

    @Lob
    @JsonProperty("info")
    private String info;

    @JsonProperty("active")
    private boolean active;

    public Path(String name, String info, boolean active) {
        this.name = name;
        this.info = info;
        this.active = active;
    }

    public Path() {
    }

    @Override
    public String toString() {
        return "Path{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", info='" + info + '\'' +
                ", active=" + active +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Path path = (Path) o;
        return active == path.active &&
                Objects.equals(id, path.id) &&
                Objects.equals(name, path.name) &&
                Objects.equals(info, path.info);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, name, info, active);
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

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
