<div align="center">
    <img src="https://user-images.githubusercontent.com/16688722/200902374-fa2a77ea-376d-4b91-825f-25184ebcc41b.png" height="256">
    <h1>ZenStack Todo Demo</h1>
    <a href="https://twitter.com/intent/tweet?text=Wow%20%40zenstackhq">
        <img src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fzenstackhq%2Fzenstack">
    </a>
    <a href="https://discord.gg/6HhebQynfz">
        <img src="https://img.shields.io/discord/1035538056146595961">
    </a>
</div>
## Overview

This is an example to show how to create a simple collaborative Todo web app below with the ZenStack library using Next.js

The deployed version can be found at https://zenstack-nextjs-todo-demo.vercel.app

## Getting Started

Clone the repository and install dependencies

```bash
git clone https://github.com/zenstackhq/zenstack-nextjs-todo-demo.git
cd zenstack-nextjs-todo-demo
npm install

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
