'use client';

import { MemberField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createLog, State } from '@/app/lib/actions';
import { useActionState } from 'react';


export default function Form({ members }: { members: MemberField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createLog, initialState);
  
  return <form action={formAction}>
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
              defaultValue=""
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
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3" aria-describedby="status-error">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="sad"
                  name="status"
                  type="radio"
                  value="sad"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="sad"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Sad <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="happy"
                  name="status"
                  type="radio"
                  value="happy"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="happy"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Happy <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          {/* you can access the errors using the form state. */}
          <div id="status-error" aria-live="polite" aria-atomic="true">
          {state.errors?.status &&
            state.errors.status.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </fieldset>
        {/* you can access the errors using the form state. */}
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
        <Button type="submit">Create Log</Button>
      </div>
    </form>
}
