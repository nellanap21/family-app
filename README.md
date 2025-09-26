# Family App

This is based on the starter template for the Next.js App Router Course. It has been modified for a family social media app.



## File Structure
- `/app`: Contains all the routes, components, and logic for your application, this is where you'll be mostly working from.
- `/app/lib`: Contains functions used in your application, such as reusable utility functions and data fetching functions.
- `/app/ui`: Contains all the UI components for your application, such as cards, tables, and forms. To save time, we've pre-styled these components for you.
- `/public`: Contains all the static assets for your application, such as images.

## Running the development server

Run `pnpm i` to install the project's packages.

Followed by `pnpm dev` to start the development server.


## Tech Stack
- **Tailwind** is a CSS framework that speeds up the development process by allowing you to quickly write utility classes directly in your React code. Here is the [documentation](https://tailwindcss.com/docs/installation/using-vite). 
- **clsx** is a library that lets you toggle class names easily. Look at [documentation](https://github.com/lukeed/clsx) for more details.
- postgres
- nextjs
- react

## Database 
- **Supabase** provides the database. Here is the [documentation](https://supabase.com/docs). 
- An API you can access in the browser will run a seed script to populate the database with an initial set of data.
- The script uses **SQL** to create the tables, and the data from `placeholder-data.ts` file to populate them after they've been created.
- Ensure your local development server is running with `pnpm run dev` and navigate to `localhost:3000/seed` 
- To make sure everything is working as expected, use another Router Handler, `app/query/route.ts`, to query the database. Inside this file, you'll find a `listLogs()` function. Navigate to `localhost:3000/query` in your browser. You should see that a log `amount` and `name` is returned.


