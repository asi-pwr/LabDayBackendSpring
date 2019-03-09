package pl.wroclaw.asi.labdaybackendspring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Entity
public class PublicAccessActive {

    @Id
    @JsonIgnore
    private Integer id;

    private boolean active;

}
