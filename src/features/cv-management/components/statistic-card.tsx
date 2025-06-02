import { RollingNumber } from "@/shared/components/rolling-number";
import { Skeleton } from "@/shared/components/ui/skeleton";
import type { ReactNode } from "react";

export default function StatisticCard({
	title,
	value,
	icon,
}: { title: string; value?: number; icon: ReactNode }) {
	return (
		<div className="bg-background border rounded-lg p-8 flex flex-row justify-between items-center">
			<div className="flex flex-col gap-2">
				<span className="text-muted-foreground text-xl font-semibold">
					{title}
				</span>
				{value ? (
					<RollingNumber value={value} className="font-extrabold text-3xl" />
				) : (
					<Skeleton className="w-6 h-9" />
				)}
			</div>
			{icon}
		</div>
	);
}
