import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestLogs from '@/app/ui/dashboard/latest-logs';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestLogs } from '@/app/lib/data';

// The page is an async server component. This allows you to use await to fetch data.
export default async function Page() {
  const revenue = await fetchRevenue();
  const latestLogs = await fetchLatestLogs();    

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Happy" value={totalHappyLogs} type="happy" /> */}
        {/* <Card title="Sad" value={totalSadLogs} type="sad" /> */}
        {/* <Card title="Total Logs" value={numberOfLogs} type="logs" /> */}
        {/* <Card
          title="Total Members"
          value={numberOfMembers}
          type="members"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue}  />
        <LatestLogs latestLogs={latestLogs} /> 
      </div>
    </main>
  );
}