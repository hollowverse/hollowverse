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

#### Notes about code sharing

1. The original directory, `shared`, is added to the ignore list of VS Code. So you won't see it. But the symlinked versions are visible, `main-site/shared` and `cms/shared`. If you want to expose the root `shared`, edit `.vscode/settings.json`.
1. The root `package.json` and `shared/package.json` should not have any dependencies because no `npm install` is run within these folders. Any dependencies that the shared code needs have to exist in both `main-site/package.json` and `cms/package.json`. That way, when `shared` is copied into those projects, the dependencies will be ready for it to consume.
