import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestLog } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import LogStatus from '@/app/ui/logs/status';
import { fetchLatestLogs } from '@/app/lib/data';

// Move data fetching down to the components that need it, 
// thus isolating which parts of your routes should be dynamic.
export default async function LatestLogs() { 
  const latestLogs = await fetchLatestLogs();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Logs
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestLogs.map((log, i) => {
            return (
              <div
                key={log.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={log.image_url}
                    alt={`${log.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {log.name}
                    </p>
                    {/* React cannot directly render a JavaScript Date object. */}
                    <p className="hidden text-sm tex-gray-500 sm:block">
                      {formatDateToLocal(log.timestamp)}
                    </p>
                  </div>
                </div>
                <LogStatus status={log.status} />
              </div>
            );
          })}
        </div> 
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
