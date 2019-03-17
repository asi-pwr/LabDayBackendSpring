package pl.wroclaw.asi.labdaybackendspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import pl.wroclaw.asi.labdaybackendspring.model.LastUpdate;

import java.sql.Timestamp;
import java.util.Date;

import static pl.wroclaw.asi.labdaybackendspring.services.LastUpdateServiceImpl.lastUpdate;

@SpringBootApplication
public class LabdaybackendspringApplication {


	public static void main(String[] args) {
		SpringApplication.run(LabdaybackendspringApplication.class, args);
		lastUpdate = new LastUpdate(new Timestamp(new Date().getTime()).toString());

	}
}