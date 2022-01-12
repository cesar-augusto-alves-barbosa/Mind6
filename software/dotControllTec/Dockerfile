FROM openjdk:8

WORKDIR /dotcontroltec

RUN cd /dotcontroltec

COPY /target/dotControllTec-1.0-SNAPSHOT-jar-with-dependencies.jar /dotcontroltec/

RUN cd /dotcontroltec/

CMD java -jar /dotcontroltec/dotControllTec-1.0-SNAPSHOT-jar-with-dependencies.jar
