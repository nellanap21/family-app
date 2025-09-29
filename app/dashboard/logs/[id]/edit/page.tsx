import Form from '@/app/ui/logs/edit-form';
import Breadcrumbs from '@/app/ui/logs/breadcrumbs';
import { fetchLogById, fetchMembers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
// page components also accept a prop called params which you can use to access the id
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
	console.log(id);

	// use Promise.all to fetch both the invoice and customers in parallel
  const [log, members] = await Promise.all([
    fetchLogById(id),
    fetchMembers(), // fetch the customer names for the dropdown.
  ]);

	// check if the log has not been found
	if (!log) {
		// return specific log not found page at /edit/not-found.tsx
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Logs', href: '/dashboard/logs' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/logs/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form log={log} members={members} />
    </main>
  );
}