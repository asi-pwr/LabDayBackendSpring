package pl.wroclaw.asi.labdaybackendspring

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import pl.wroclaw.asi.labdaybackendspring.model.Timetable

@SpringBootApplication
object LabdaybackendspringApplication {

    @JvmStatic
    fun main(args: Array<String>) {
        SpringApplication.run(LabdaybackendspringApplication::class.java, *args)
        val t1 = Timetable(4, 2, 5, 1521882000, 1521885600)
        val t2 = Timetable
                .builder()
                .id(4)
                .pathId(2)
                .eventId(5)
                .timeStart(1521882000)
                .timeEnd(1521885600)
                .build()
        assert(t1.id == 4)
        assert(t1 === t2)
        t1.pathId = 1
        assert(t1.pathId == 1)
    }
}
