import { 
  FaRegFaceSmileBeam,
  FaRegFaceSmile,
  FaRegFaceMeh,
  FaRegFaceFrown,
  FaRegFaceTired   
} from "react-icons/fa6";

import clsx from 'clsx';

export default function LogStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-600 text-white': status === 'very unhappy',
          'bg-red-400 text-white': status === 'unhappy',
          'bg-gray-300 text-gray-800': status === 'meh',
          'bg-sky-400 text-white': status === 'happy',
          'bg-blue-600 text-white': status === 'very happy',
        },
      )}
    >
      {status === 'very unhappy' ? (
        <>
          Very Unhappy
          <FaRegFaceTired className="ml-1 w-4"/>
        </>
      ) : null}
      {status === 'unhappy' ? (
        <>
          Unhappy
          <FaRegFaceFrown className="ml-1 w-4"/>
        </>
      ) : null}
      {status === 'meh' ? (
        <>
          Meh
          <FaRegFaceMeh className="ml-1 w-4"/>
        </>
      ) : null}
      {status === 'happy' ? (
        <>
          Happy
          <FaRegFaceSmile className="ml-1 w-4"/>
        </>
      ) : null}
      {status === 'very happy' ? (
        <>
          Very Happy
          <FaRegFaceSmileBeam className="ml-1 w-4"/>
        </>
      ) : null}
    </span>
  );
}
