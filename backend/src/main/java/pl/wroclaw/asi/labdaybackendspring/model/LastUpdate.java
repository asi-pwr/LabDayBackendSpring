package pl.wroclaw.asi.labdaybackendspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@AllArgsConstructor
@Data
public class LastUpdate {

    @JsonProperty("updated_at")
    private Timestamp updatedAt;
}
