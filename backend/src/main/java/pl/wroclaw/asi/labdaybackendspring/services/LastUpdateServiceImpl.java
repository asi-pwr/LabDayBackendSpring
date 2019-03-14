package pl.wroclaw.asi.labdaybackendspring.services;

import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.wroclaw.asi.labdaybackendspring.model.LastUpdate;

import javax.persistence.EntityManagerFactory;
import java.sql.Timestamp;

@Service
public class LastUpdateServiceImpl implements LastUpdateService {

    public static LastUpdate lastUpdate;


//    private final static String LAST_UPDATE_QUERY =
//            "SELECT MAX(pg_xact_commit_timestamp(xmin)) AS date FROM (" +
//            "SELECT xmin FROM event UNION " +
//            "SELECT xmin FROM timetable UNION " +
//            "SELECT xmin FROM path UNION " +
//            "SELECT xmin FROM place UNION " +
//            "SELECT xmin FROM speaker ) As timestamps ";
//
//    private EntityManagerFactory entityManagerFactory;
//
//    private SessionFactory sessionFactory;
//
//
//    @Autowired
//    public LastUpdateServiceImpl(EntityManagerFactory entityManagerFactory) {
//        this.entityManagerFactory = entityManagerFactory;
//        this.sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
//    }
//
//    public LastUpdate getLastUpdate() {
//        Timestamp cleanedResult = null;
//        NativeQuery query = sessionFactory.openSession().createSQLQuery(LAST_UPDATE_QUERY);
//
//        Object hibernateResult = query.list().get(0);
//        if (hibernateResult instanceof Timestamp)
//            cleanedResult = (Timestamp) hibernateResult;
//        return new LastUpdate(cleanedResult);
//    }
}
