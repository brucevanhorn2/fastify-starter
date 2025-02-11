# fastify-starter

I'm planning on some new projects coming up and I want to learn Typescript, so I'm making a starter.

Since I'm just starting, I'm going to keep some notes in the readme and I'll make this nicer later.

I want to use elastic for logging:
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

I'm adding postgres support.  OK, actually I'm adding sequelize and plan to use postgres.  So I need a docker command.

```bash
docker run -d `
  --name my_postgres `
  -e POSTGRES_USER=myuser `
  -e POSTGRES_PASSWORD=mypassword `
  -e POSTGRES_DB=mydatabase `
  -p 5432:5432 `
  -v D:\docker_volumes\pgsql:/var/lib/postgresql/data `
  postgres:latest
```

I'm also adding Kafka support.  It'd be cool if I could serve a Kafka stream via SSE.
Once again, I need a docker command. https://docs.docker.com/guides/kafka/

```bash
docker run -d --name=kafka -p 9092:9092 apache/kafka
```

## Running it
```bash
npx ts-node src/server.ts
```