import { lusitana } from '@/app/ui/fonts';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export default function Calendar({

}) {
    return (
        <div className="flex w-full flex-col md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Calendar
            </h2>
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                <div className="bg-white px-6">
                    {/* Header */}
                    <div className="mb-1 flex justify-between px-1">
                        <button className="rounded p-1 hover:bg-gray-100" aria-label="Previous month">
													<ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                        </button>
												<h3 className="text-lg">October</h3>
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

                </div>
            </div>
        </div>
    );
}