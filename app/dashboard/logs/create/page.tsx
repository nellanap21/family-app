import Form from '@/app/ui/logs/create-form';
import Breadcrumbs from '@/app/ui/logs/breadcrumbs';
import { fetchMembers } from '@/app/lib/data';
 
export default async function Page() {
  const members = await fetchMembers(); 
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Logs', href: '/dashboard/logs' },
          {
            label: 'Create Log',
            href: '/dashboard/logs/create',
            active: true,
          },
        ]}
      />
      <Form members={members} />
    </main>
  );
}