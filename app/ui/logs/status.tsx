// TODO: fix icons for statuses
import {
  CheckIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  MinusCircleIcon,
  CheckCircleIcon,
  StarIcon,
} from '@heroicons/react/24/solid';

import clsx from 'clsx';

export default function LogStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-500 text-white': status === 'very sad',
          'bg-red-300 text-white': status === 'sad',
          'bg-gray-200 text-gray-700': status === 'meh',
          'bg-blue-300 text-white': status === 'happy',
          'bg-blue-500 text-white': status === 'very happy',
        },
      )}
    >
      {status === 'very sad' ? (
        <>
          Very Sad
          <XCircleIcon className="ml-1 w-4" />
        </>
      ) : null}
      {status === 'sad' ? (
        <>
          Sad
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'meh' ? (
        <>
          Meh
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'happy' ? (
        <>
          Happy
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'very happy' ? (
        <>
          Very Happy
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
