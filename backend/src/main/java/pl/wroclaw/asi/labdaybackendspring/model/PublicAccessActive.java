package pl.wroclaw.asi.labdaybackendspring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;


@Entity
public class PublicAccessActive {

    @Id
    @JsonIgnore
    private Integer id;

    private boolean active;


    public PublicAccessActive(Integer id, boolean active) {
        this.id = id;
        this.active = active;
    }

    public PublicAccessActive() {
    }

    @Override
    public String toString() {
        return "PublicAccessActive{" +
                "id=" + id +
                ", active=" + active +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PublicAccessActive that = (PublicAccessActive) o;
        return active == that.active &&
                Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, active);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
