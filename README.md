# PWA Resgatando Anas

Produção [resgatandoanasofc](https://resgatandoanasofc.vercel.app/)

Desenvolvimento [resgatando-anas.vercel](https://resgatando-anas.vercel.app/)

## Getting Started

First, run the development server:

```bash
npm run dev
```

```bash
sudo prisma generate
```

ou

```bash
prisma generate
```

## Update data tables on the server with Prisma

### Create a name for the data migration

```bash
npx prisma migrate dev --name add_default_values
```

### Check the migration status

```bash
npx prisma migrate status
```

### Complete the migration

```bash
npx prisma migrate dev
```

Open [http://localhost:5101](http://localhost:5101) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
