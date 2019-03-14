package pl.wroclaw.asi.labdaybackendspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;


import java.sql.Timestamp;
import java.util.Objects;


public class LastUpdate {

    @JsonProperty("updated_at")
    private Timestamp updatedAt;

    public LastUpdate(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LastUpdate() {
    }


    @Override
    public String toString() {
        return "LastUpdate{" +
                "updatedAt=" + updatedAt +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LastUpdate that = (LastUpdate) o;
        return Objects.equals(updatedAt, that.updatedAt);
    }

    @Override
    public int hashCode() {

        return Objects.hash(updatedAt);
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
