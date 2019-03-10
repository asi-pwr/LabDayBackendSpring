build:
	docker run --rm -v "${PWD}/backend":/home/gradle/project -w /home/gradle/project gradle:5.2.1-jre11-slim gradle bootJar
	mv ${PWD}/backend/build/libs/labdaybackendspring-0.0.1-SNAPSHOT.jar .
	docker-compose build

run: build
	docker-compose up

clean:
	-rm *.jar
