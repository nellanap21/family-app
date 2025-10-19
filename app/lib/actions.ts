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
  memberId: z.string({
		invalid_type_error: 'Please select a member.',
	}),
  status: z.enum(['very unhappy', 'unhappy', 'meh', 'happy', 'very happy'], {
		invalid_type_error: 'Please select a status.',
	}),
  note: z.string().max(50, { message: 'Note must be less than 50 characters.' }),
  date: z.string(),
});

const CreateLog = FormSchema.omit({ id: true, date: true });
const UpdateLog = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    memberId?: string[];
    status?: string[];
    note?: string[];
  };
  message?: string | null;
};

// extract the values of formData
export async function createLog(prevState: State, formData: FormData) {
  // pass raw form data to CreateLog to validate the types:
  const validatedFields = CreateLog.safeParse({
    memberId: formData.get('memberId'),
    status: formData.get('status'),
    note: formData.get('note'),
  });

	// If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Log.',
    };
  }

	const { memberId, status, note } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0]; // create a new date with the format "YYYY-MM-DD"

  try {
    // runs sql query to insert a new log into the database
    await sql`
        INSERT INTO logs (member_id, status, note, date)
        VALUES (${memberId}, ${status}, ${note}, ${date})
    `;
  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Log.',
    };
  }


  // Next.js has a client-side router cache that stores the route segments 
  // in the user's browser. Since you're updating the data displayed 
  // in the logs route and dashboard, you want to clear this cache and trigger a
  // new request to the server so fresh data will be fetched
  revalidatePath('/dashboard/logs');
  revalidatePath('/dashboard');

  // now redirect the user back to the /dashboard/logs page
  redirect('/dashboard/logs');

}

export async function updateLog(
	id: string, 
	prevState: State, 
	formData: FormData,
) {
	const validatedFields = UpdateLog.safeParse({
    memberId: formData.get('memberId'),
    status: formData.get('status'),
    note: formData.get('note')
  });
 
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Update Log.',
		};
	}

	const { memberId, status, note } = validatedFields.data;
 
  try {
    await sql`
        UPDATE logs
        SET member_id = ${memberId}, status = ${status}, note = ${note}
        WHERE id = ${id}
    `;
  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return { message: 'Database Error: Failed to Update Log.' };
  }

  // redirect is being called outside of the try/catch block. 
  // this is because redirect works by throwing an error, 
  // which would be caught by the catch block. To avoid this, 
  // you can call redirect after try/catch. 
  // redirect would only be reachable if try is successful.
  revalidatePath('/dashboard/logs');
  revalidatePath('/dashboard');
  redirect('/dashboard/logs');
}

export async function deleteLog(id: string) {
	// next line simulates an uncaught exception in this action
	// throw new Error('Failed to Delete Invoice');
  
  await sql`DELETE FROM logs WHERE id = ${id}`;
  revalidatePath('/dashboard/logs');
  revalidatePath('/dashboard');

  // Since this action is being called in the /dashboard/logs path, 
  // you don't need to call redirect. 
}