import Pagination from '@/app/ui/logs/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/logs/table';
import { CreateLog } from '@/app/ui/logs/buttons';
import { lusitana } from '@/app/ui/fonts';
import { LogsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
 
// Next.js automatically parses the URL query string (?query=...&page=...) and 
// passes it as the searchParams prop to your Page component.

// type annotation for the props object that Next.js passes into the page:
// searchParams is a Promise that resolves to an object with two optional fields, query and string
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams; // waits for searchParams prop to resolve.
  const query = searchParams?.query || ''; // reads the query parameter from the URL
  const currentPage = Number(searchParams?.page) || 1; // reads the page parameter from the URL
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Logs</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search logs..." />
        <CreateLog />
      </div>
      <Suspense key={query + currentPage} fallback={<LogsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> 
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}