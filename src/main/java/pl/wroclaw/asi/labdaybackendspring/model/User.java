package pl.wroclaw.asi.labdaybackendspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("username")
    private String login;

    @JsonProperty("password")
    private String password;
}
