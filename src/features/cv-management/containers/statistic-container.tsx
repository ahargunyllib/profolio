"use client";

import { useGetMyCVStatisticQuery } from "@/shared/repositories/cvs/query";
import { CheckCircleIcon, ClockIcon, FileTextIcon } from "lucide-react";
import StatisticCard from "../components/statistic-card";

export default function StatisticContainer() {
	const { data: res, isLoading } = useGetMyCVStatisticQuery();

	return (
		<div className="grid md:grid-cols-2 md:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 gap-y-4 gap-x-8">
			<StatisticCard
				title="Total CVs"
				value={
					!isLoading && res && res.success && res.data
						? res.data.total
						: undefined
				}
				icon={
					<div className="p-4 rounded-lg bg-blue-100">
						<FileTextIcon className="text-blue-600" />
					</div>
				}
			/>
			<StatisticCard
				title="Avg ATS Score"
				value={
					!isLoading && res && res.success && res.data
						? res.data.avgATSScore
							? Number.parseInt(res.data.avgATSScore)
							: 0
						: undefined
				}
				icon={
					<div className="p-4 rounded-lg bg-green-100">
						<CheckCircleIcon className="text-green-600" />
					</div>
				}
			/>
			<StatisticCard
				title="Completed"
				value={
					!isLoading && res && res.success && res.data
						? res.data.completed
						: undefined
				}
				icon={
					<div className="p-4 rounded-lg bg-green-100">
						<CheckCircleIcon className="text-green-600" />
					</div>
				}
			/>
			<StatisticCard
				title="In Progress"
				value={
					!isLoading && res && res.success && res.data
						? res.data.inProgress
						: undefined
				}
				icon={
					<div className="p-4 rounded-lg bg-yellow-100">
						<ClockIcon className="text-yellow-600" />
					</div>
				}
			/>
		</div>
	);
}
