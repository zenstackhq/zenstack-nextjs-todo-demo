This is a starter project for using [ZenStack](https://github.com/zenstackhq/zenstack) with [Next.js](https://nextjs.org/) and [Next Auth](https://next-auth.js.org/).

It's extended from [Prisma's Next.js Starter](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes).

## Getting Started

First create a project from this starter:

```bash
npx create-next-app [project-name] --use-npm -e https://github.com/zenstackhq/nextjs-auth-postgres-template

cd [project-name]
```

Run ZenStack generator:

```
npm run generate
```

Set a postgres connection string to DATABASE_URL in .env:

```
DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@[YOUR-URL]/postgres"
```

Sync schema with database

```
npm run db:push
```

Finally it's time to run your app locally:

```
npm run dev
```

## Code Structure

### Data Model

The data model is located at [/zenstack/schema.zmodel](zenstack/schema.zmodel).

### Next-Auth Integration

You can find integration with Next-Auth at [/pages/api/auth/[...nextauth].ts](pages/api/auth/[...nextauth].ts).

### Mounted Data Services

The generated RESTful data access services are mounted at: [/pages/api/zenstack/[...path].ts](pages/api/zenstack/[...path].ts).

## Learn More

To learn more about ZenStack, take a look at the following resources:

- [ZenStack Documentation](https://github.com/zenstackhq/zenstack#readme)
