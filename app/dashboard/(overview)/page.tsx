import { Card } from '@/app/ui/dashboard/cards';
import LatestLogs from '@/app/ui/dashboard/latest-logs';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { LatestLogsSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import Calendar from '@/app/ui/dashboard/calendars';

// The page is an async server component. This allows you to use await to fetch data.
// wrap components in suspense and have a fallback skeleton
export default async function Page() {

  return (
    <main>
      {/* <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1> */}
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div> */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Calendar memberId="8e4bb515-ef8a-487f-b07f-1799c56da54c"/>
        <Calendar memberId="c97d7f7b-06a3-4bf9-b4ac-7286269d9be8"/>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<LatestLogsSkeleton />}>
          <LatestLogs />
        </Suspense>
      </div>
    </main>
  );
}