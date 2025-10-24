import { lusitana } from '@/app/ui/fonts';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { 
  FaRegFaceSmileBeam,
  FaRegFaceSmile,
  FaRegFaceMeh,
  FaRegFaceFrown,
  FaRegFaceTired   
} from "react-icons/fa6";

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

// returns a number 0=Sun to 6=Sat
function startOfMonthDay(year: number, month: number) {
	return new Date(year, month, 1).getDay(); 
}

function daysInMonth(year: number, month: number) {
	return new Date(year, month + 1, 0).getDate();
}

// gets data for month before and after current month
function addMonth(year: number, month: number, delta: number) {
	const d = new Date(year, month + delta, 1);
	return { year: d.getFullYear(), month: d.getMonth() };
}

// Month index is from 0 to 11
function buildMonthMatrix(year: number, month: number) {
	const firstDay = startOfMonthDay(year, month);
	const totalDays = daysInMonth(year, month);

	// render 6 rows by 7 cols (42 cells) to keep layout stable
	const prev = addMonth(year, month, -1);
	const next = addMonth(year, month, 1);
	const prevDays = daysInMonth(prev.year, prev.month);

	// declares array
	// typescript annotation that each element must be this type of object
	const cells: {
		year: number;
		month: number;
		day: number;
		inCurrentMonth: boolean;
	}[] = []

	// fill lead-in from previous month
	for (let i = 0; i < firstDay; i++) {
		cells.push({
			year: prev.year,
			month: prev.month,
			day: prevDays - firstDay + 1 + i,
			inCurrentMonth: false,
		});
	}

	// fill current month
	for (let d = 1; d <= totalDays; d++) {
		cells.push({ year, month, day: d, inCurrentMonth: true });
	}

	// fill trailing days from next month
	const trailing = 42 - cells.length; 
	for (let d = 1; d <= trailing; d++) {
		cells.push({ year: next.year, month: next.month, day: d, inCurrentMonth: false })
	}

	return cells;
}


export default function Calendar({

}) {

		const cells = buildMonthMatrix(2025, 9);

		const monthName = new Date(2025, 9, 1).toLocaleString("en-US", { month: "long" });
		console.log(monthName);

    return (
        <div className="flex w-full flex-col md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Test Calendar
            </h2>
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                <div className="bg-white px-6">
                    {/* Header */}
                    <div className="mb-1 flex justify-between px-1">
                        <button className="rounded p-1 hover:bg-gray-100" aria-label="Previous month">
													<ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                        </button>
												<h3 className="text-lg">{monthName.toUpperCase()}</h3>
												<button className="rounded p-1 hover:bg-gray-100" aria-label="Previous month">
													<ChevronRightIcon className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

										{/* Day labels */}
										<div className="grid grid-cols-7 text-center text-sm">
											{DAY_LABELS.map((d, i) => (
												<div key={i} className="py-1">{d}</div>
											))}
										</div>

										{/* Grid */}
										<div className="grid grid-cols-7">
											{cells.map((c, idx) => {
												const inMonth = c.inCurrentMonth;

												return (
													<div
														key={idx}
														className="relative aspect-square border border-slate-400"
													>
														{/* Day number (top-left) */}
														<div className="absolute left-1 top-1">
															{c.day}
														</div>	

														{/* Mood icon */}
														<div className="flex h-full items-center justify-center">
															<FaRegFaceSmile className="w-4 mt-3"/>
														</div>
													</div>
												)
											})

											}
										</div>
                </div>
            </div>
        </div>
    );
}