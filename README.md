# notes

## What it does

A small HTTP API for notes. Notes live in memory for the lifetime of the process.

## Run

Install dependencies once:

```bash
npm install
```

Start the service:

```bash
./scripts/run.sh
```

The process listens on the port in the `PORT` environment variable. If `PORT` is not set, it uses **8080**.

```bash
PORT=9999 ./scripts/run.sh
```

Then open `http://127.0.0.1:9999/`. `GET /healthz` returns `200` and `{"status":"ok"}`.

## Test

```bash
./scripts/test.sh
```

A passing run exits 0 and prints `TESTS: n/n`.

## API

| Method | Path | What it does |
| --- | --- | --- |
| GET | `/` | Returns a short hello message |
| GET | `/healthz` | Health check, no database |
| POST | `/notes` | Creates a note from `{"text":"..."}` |
| GET | `/notes` | Lists notes |
| GET | `/notes/:id` | Returns one note, or 404 |
| DELETE | `/notes/:id` | Deletes one note, or 404 |
