# Hollowverse Monorepo

This is a monorepo using npm workspaces. The workspaces are `main-site`, `cms`, and `shared`.

## `main-site`

This is the code for the main website, hollowverse.com. It is a Next.js project.

## `cms`

This is the code for the content management system, cms.hollowverse.com. It is a Sanity Studio project.

## `shared`

This code is shared among the projects above.

### How does code sharing work

After `npm install`, virtual copies of the `shared` folder get created inside `main-site` and `cms`. Meaning, you'll have `main-site/shared`, `cms/shared`, and the root `shared`. Any changes in any one of these is reflected in the other folders.

This is done by way of symlinking.

We do this because it's the most convenient way we know to share code between a Next.js project and Sanity Studio project in the same repo.
