# AssociHealth - shadcn/ui monorepo

This is a monorepo template for AssociHealth using shadcn/ui components with pnpm workspaces.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Adding shadcn/ui Components

### Quick Command (Recommended)

Use the custom script to add components to the dentistry app:

```bash
pnpm run add-component button -c apps/dentistry
pnpm run add-component input -c apps/dentistry
pnpm run add-component card -c apps/dentistry
```

### Manual Command

Alternatively, you can run the shadcn command directly:

```bash
pnpm dlx shadcn@latest add button -c apps/dentistry
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```
