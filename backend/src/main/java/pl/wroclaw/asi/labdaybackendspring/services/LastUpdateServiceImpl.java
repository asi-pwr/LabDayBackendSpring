package pl.wroclaw.asi.labdaybackendspring.services;

import org.springframework.stereotype.Service;
import pl.wroclaw.asi.labdaybackendspring.model.LastUpdate;

@Service
public class LastUpdateServiceImpl implements LastUpdateService {
    public static LastUpdate lastUpdate;
}
