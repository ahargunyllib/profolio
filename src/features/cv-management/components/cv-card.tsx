import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useDeleteCVMutation } from "@/shared/repositories/cvs/query";
import type { CV } from "@/shared/types";
import {
	CalendarIcon,
	CheckCircleIcon,
	EditIcon,
	EllipsisVerticalIcon,
	Trash2Icon,
} from "lucide-react";
import Link from "next/link";

type Props = {
	cv: CV;
};

const badges = {
	1: {
		label: "Draft",
		variant: "secondary",
		icon: CheckCircleIcon,
	},
	2: {
		label: "Needs Review",
		variant: "destructive",
		icon: CheckCircleIcon,
	},
	3: {
		label: "Completed",
		variant: "default",
		icon: CheckCircleIcon,
	},
} as const;

export default function CVCard({ cv }: Props) {
	const Icon = badges[cv.status].icon;

	const { mutate: deleteCV, isPending } = useDeleteCVMutation();

	return (
		<div className="bg-background border rounded-lg p-8 flex flex-col gap-4">
			<div className="flex flex-row justify-between gap-12 items-center">
				<h4 className="font-bold text-xl">{cv.jobName}</h4>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size="icon" variant="ghost">
							<EllipsisVerticalIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							variant="destructive"
							onClick={() => deleteCV(cv.id)}
							disabled={isPending}
						>
							<Trash2Icon />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="flex flex-row justify-between items-center">
				<Badge variant={badges[cv.status].variant}>
					<Icon />
					{badges[cv.status].label}
				</Badge>
				<div className="flex flex-col">
					<span className="text-sm text-muted-foreground">ATS Score</span>
					<span className="font-semibold text-lg text-right">
						{cv.atsScore}%
					</span>
				</div>
			</div>
			<span className="text-xs text-muted-foreground flex flex-row gap-2 items-center">
				<CalendarIcon className="size-4" />
				Modified{" "}
				{Intl.DateTimeFormat("en-US", {
					hour: "numeric",
					minute: "numeric",
					day: "numeric",
					month: "numeric",
					year: "numeric",
				}).format(new Date(cv.updatedAt))}
			</span>
			<div className="flex flex-row gap-2">
				<Button className="flex-1" variant="outline" asChild>
					<Link href={`/dashboard/cv-builder/${cv.id}`}>
						<EditIcon /> Edit
					</Link>
				</Button>
				{/* <Button className="flex-1" variant="outline">
					<DownloadIcon /> Download
				</Button> */}
			</div>
		</div>
	);
}
