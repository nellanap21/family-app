import {
  UserGroupIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import { 
  FaRegFaceSmileBeam,
  FaRegFaceSmile,
  FaRegFaceMeh,
  FaRegFaceFrown,
  FaRegFaceTired   
} from "react-icons/fa6";
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  'very sad': FaRegFaceTired,
  'sad': FaRegFaceFrown,
  'meh': FaRegFaceMeh,
  'happy': FaRegFaceSmile,
  'very happy': FaRegFaceSmileBeam,
  members: UserGroupIcon,
  logs: DocumentDuplicateIcon,
};

export default async function CardWrapper() {
  const {
    numberOfLogs,
    numberOfMembers,
    totalVerySadLogs,
    totalSadLogs,
    totalMehLogs,
    totalHappyLogs,
    totalVeryHappyLogs,
  } = await fetchCardData();

  return (
    <>
      <Card title="Very Sad" value={totalVerySadLogs} type="very sad" />
      <Card title="Sad" value={totalSadLogs} type="sad" />
      <Card title="Happy" value={totalHappyLogs} type="happy" />
      <Card title="Very Happy" value={totalVeryHappyLogs} type="very happy" />
      <Card title="Meh" value={totalMehLogs} type="meh" />
      <Card title="Total Logs" value={numberOfLogs} type="logs" />
      <Card
        title="Total Members"
        value={numberOfMembers}
        type="members"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'logs' | 'members' | 'very sad' | 'sad' | 'meh' | 'happy' | 'very happy';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
