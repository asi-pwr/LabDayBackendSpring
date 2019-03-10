
USER_ID=$(shell id -u)
GROUP_ID=$(shell id -g)

build:
	docker run -u root -it --rm -v "${PWD}/backend":/home/gradle/project gradle:5.2.1-jre11-slim /bin/bash -c "cd /home/gradle/project && gradle bootJar && chown -R $(USER_ID):$(GROUP_ID) /home/gradle/project"
	mv ${PWD}/backend/build/libs/labdaybackendspring-0.0.1-SNAPSHOT.jar .
	docker-compose build

run: build
	docker-compose up

clean:
	-rm *.jar
