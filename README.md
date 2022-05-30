# hivemind API

Boilerplate: https://github.com/davidnguyen179/typescript-graphql-postgres-boilerplate

## Running

Run `npm i --force` (had some dependency resolution errors I didn't want to spend time debugging).

Create a `.env` file at the root containing the following:

```
POSTGRES_USER=docker
POSTGRES_PASSWORD=docker
POSTGRES_HOST=localhost
POSTGRES_DB=hivemind
POSTGRES_PORT=5432
```

Make sure Docker is running on your computer. Then spin up and seed the Postgres instance with `npm run db`.

Then run the API with `npm run dev`. This will spin up the GraphQL server at `localhost:4000`.
