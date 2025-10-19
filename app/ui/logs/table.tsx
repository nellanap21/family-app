import Image from 'next/image';
import { UpdateLog, DeleteLog } from '@/app/ui/logs/buttons';
import LogStatus from '@/app/ui/logs/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredLogs } from '@/app/lib/data';

export default async function LogsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const logs = await fetchFilteredLogs(query, currentPage);

  return (
    // layout wrapper
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {logs?.map((log) => (
              <div
                key={log.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                {/* Top section: Member info + status */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={log.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${log.name}'s profile picture`}
                      />
                      <p>{log.name}</p>
                    </div>
                  </div>
                  <LogStatus status={log.status} />
                </div>

                {/* Note section */}
                {log.note && (
                  <div className="mt-3 border-b pb-4">
                    <p className="text-sm text-gray-700">{log.note}</p>
                  </div>
                )}

                {/* Bottom section: Date + Actions */}
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(log.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateLog id={log.id} />
                    <DeleteLog id={log.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop View */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Member
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Note
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {logs?.map((log) => (
                <tr
                  key={log.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  {/* Member column */}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={log.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${log.name}'s profile picture`}
                      />
                      <p>{log.name}</p>
                    </div>
                  </td>

                  {/* Date column */}
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(log.date)}
                  </td>

                  {/* Status column */}
                  <td className="whitespace-nowrap px-3 py-3">
                    <LogStatus status={log.status} />
                  </td>

                  {/* Note column */}
                  <td className="whitespace-pre-line px-3 py-3 text-gray-700">
                    {log.note || <span className="italic text-gray-400"> </span>}
                  </td>

                  {/* Actions column */}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateLog id={log.id} />
                      <DeleteLog id={log.id} />
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
