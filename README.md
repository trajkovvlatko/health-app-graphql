## Health app - GraphQL API

### Development and test

Create databases for dev and test

Rename `env.dev` to `.env.dev`, `env.test` to `.env.test` and fix the values.

###### Install dependencies

```
yarn
```

###### Run development server (with nodemon):

```
yarn watch
```

###### Export database schema:

```
pg_dump --schema-only health_development > src/spec/database.sql
```

###### Run specs:

```
yarn run spec
```

Note for specs: If the truncate takes too long and makes all tests slow, add `fsync=off` in postgres.conf. DO NOT add this on a production server.

###### Run lint:

```
yarn run lint
```

###### Run seeds

```
yarn run seed
```

Note for seeds: It will truncate and insert dummy data to all tables.
