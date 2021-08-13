# Plantuml UI

## Start server

```
java -jar plantuml.jar -picoweb:8199
```

## Start client

```
docker build -t tapoch/plantuml-ui .
docker run -it -p 8080:8080 --rm --name plantuml-ui tapoch/plantuml-ui
```

### Plantuml docs

[plantuml.com](https://plantuml.com/ru/sequence-diagram)
