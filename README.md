# smg

Creates database folders and files based on the sql files in the `migrations` folder.

Migrations can be found in database/migrations

Intended to work in git repository

## Dummy database

When in dev mode, when creating new migration, a dump of database is
performed in ./database/dump.sql

When migrating in dev mode, the dump file is restored from ./database/dump.sql

## Environment variables

Env vars are expected in `.env` file.

```dotenv
NODE_ENV=development #or production
DB_NAME= #required
DB_HOST= #default localhost
DB_PORT= #default 3306

DB_USER= #required
DB_PASS= #required
```

## Commands

### `smg init`

Initializes database folder structure

### `smg createdb [name]`

Runs all up migrations, intended to be used in empty database.
Clears all tables before running.

### `smg create [--force]`

Creates new migration up and down files in `./database/migrations`

### `smg update`

Migrates from current database schema to latest schema.

### `smg dump`

Dumps database in `./database/dump.sql`.

### `smg restore [number]`

Reverts database [number] schema. If no number is given,
it will revert to the last migration.

### `log [-a]`

Prints log of migrations
Default, prints last 10 migrations.
