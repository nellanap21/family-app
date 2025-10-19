'use client';

import { MemberField, LogForm } from '@/app/lib/definitions';
import {
  UserCircleIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { 
  FaRegFaceSmileBeam,
  FaRegFaceSmile,
  FaRegFaceMeh,
  FaRegFaceFrown,
  FaRegFaceTired   
} from "react-icons/fa6";
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateLog, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditLogForm({
  log,
  members,
}: {
  log: LogForm;
  members: MemberField[];
}) {
  const initialState: State = { message: null, errors: {} };
  // You can pass id to the Server Action using JS bind. 
  // This will ensure that any values passed to the Server Action are encoded.
  const updateLogWithId = updateLog.bind(null, log.id);
  const [state, formAction] = useActionState(updateLogWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Member Name */}
        <div className="mb-4">
          <label htmlFor="member" className="mb-2 block text-sm font-medium">
            Choose member
          </label>
          <div className="relative">
            <select
              id="member"
              name="memberId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={log.member_id}
              aria-describedby="member-error"
            >
              <option value="" disabled>
                Select a member
              </option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {/* you can access the errors using the form state. */}
          <div id="member-error" aria-live="polite" aria-atomic="true">
          {state.errors?.memberId &&
            state.errors.memberId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Log Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the log status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center">
                <input
                  id="very unhappy"
                  name="status"
                  type="radio"
                  value="very unhappy"
                  defaultChecked={log.status === 'very unhappy'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="very unhappy"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-medium text-white"
                >
                  <FaRegFaceTired className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="unhappy"
                  name="status"
                  type="radio"
                  value="unhappy"
                  defaultChecked={log.status === 'unhappy'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="unhappy"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-400 px-3 py-1.5 text-xs font-medium text-white"
                >
                  <FaRegFaceFrown className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="meh"
                  name="status"
                  type="radio"
                  value="meh"
                  defaultChecked={log.status === 'meh'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="meh"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-300 px-3 py-1.5 text-xs font-medium text-gray-800"
                >
                  <FaRegFaceMeh className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="happy"
                  name="status"
                  type="radio"
                  value="happy"
                  defaultChecked={log.status === 'happy'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="happy"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-sky-400 px-3 py-1.5 text-xs font-medium text-white"
                >
                  <FaRegFaceSmile className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="very happy"
                  name="status"
                  type="radio"
                  value="very happy"
                  defaultChecked={log.status === 'very happy'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="very happy"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white"
                >
                  <FaRegFaceSmileBeam className="h-4 w-4" />
                </label>
              </div>

            </div>
          </div>
        </fieldset>

        {/* Log Note */}
        <div className="mb-4">
          <label htmlFor="note" className="mb-2 block text-sm font-medium">
            Note
          </label>
          <div className="relative">
            <textarea
              id="note"
              name="note"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"  
              rows={1}
              placeholder="Enter a note"
              maxLength={50}
              defaultValue={log.note}
            />
            <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Overall Form Errors*/}
        <div id="overall-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          )}
        </div>  

      </div>
      
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/logs"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Log</Button>
      </div>
    </form>
  );
}
