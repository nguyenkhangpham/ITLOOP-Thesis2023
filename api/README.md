- Node v16.14.0
- Use yarn
- Add variables in .env

## Installation

```bash
$ yarn install
```

## Running application

**1. Production.**

```bash
$ yarn start
```

**2. Development.**

```bash
$ yarn start:dev
```

**3. Build application.**

```bash
$ yarn build
```

## Running application with docker

```bash
# create volume
$ docker volume create mysql

# Docker run development mode
$ docker compose up -d

```

## Migration

```bash
# create migrate
$ yarn migrate:create

# generate migrate
$ yarn migrate:generate src/database/migrations/file_name

# run migrate
$ yarn migrate:run

# show migrate
$ yarn migrate:show

# revert migrate
$ yarn migrate:revert
```

## seed data

```bash
# run seed
$ yarn seed

```
