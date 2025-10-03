import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  MembersTableType,
  FormattedMembersTable,
} from '@/app/lib/definitions';

export default async function MembersTable({
  members,
}: {
  members: FormattedMembersTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Members
      </h1>
      <Search placeholder="Search members..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {members?.map((member) => (
                  <div
                    key={member.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={member.image_url}
                              className="rounded-full"
                              alt={`${member.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{member.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Sad</p>
                        <p className="font-medium">{member.total_sad}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Happy</p>
                        <p className="font-medium">{member.total_happy}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{member.total_logs} logs</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Logs
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Sad
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total Happy
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {members.map((member) => (
                    <tr key={member.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={member.image_url}
                            className="rounded-full"
                            alt={`${member.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{member.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {member.total_logs}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {member.total_sad}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {member.total_happy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
