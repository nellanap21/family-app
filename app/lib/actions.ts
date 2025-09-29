// React Server Actions allow you to run asynchronous code directly on the server. 
// They eliminate the need to create API endpoints to mutate your data. 
// Instead, you write asynchronous functions that execute on the server and 
// can be invoked from your Client or Server Components.

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Import Zod and define a schema that matches the shape of log object. 
// This schema will validate the formData before saving it to a database.

const FormSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  amount: z.coerce.number(), // automatically coerce from string to number
  status: z.enum(['sad', 'happy']),
  date: z.string(),
});

const CreateLog = FormSchema.omit({ id: true, date: true });

// extract the values of formData
export async function createLog(formData: FormData) {
  // pass  raw form data to CreateLog to validate the types:
  const { memberId, amount, status } = CreateLog.parse({
    memberId: formData.get('memberId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100; // convert amount to cents
  const date = new Date().toISOString().split('T')[0]; // create a new date with the format "YYYY-MM-DD"

  // runs sql query to insert a new log into the database
  await sql`
    INSERT INTO logs (member_id, amount, status, date)
    VALUES (${memberId}, ${amountInCents}, ${status}, ${date})
  `;

  // Next.js has a client-side router cache that stores the route segments 
  // in the user's browser. Since you're updating the data displayed 
  // in the logs route, you want to clear this cache and trigger a
  // new request to the server so fresh data will be fetched
  revalidatePath('/dashboard/logs');

  // now redirect the user back to the /dashboard/logs page
  redirect('/dashboard/logs');

}
