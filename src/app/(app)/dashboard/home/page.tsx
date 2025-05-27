import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { CVStatusArray } from "@/shared/lib/enums";
import {
	CalendarIcon,
	CheckCircleIcon,
	DownloadIcon,
	EditIcon,
	EllipsisVerticalIcon,
	FileTextIcon,
	FilterIcon,
	PlusIcon,
	SearchIcon,
} from "lucide-react";
import type { ReactNode } from "react";

export default function Page() {
	return (
		<section className="min-h-dvh flex flex-col">
			<Header />
			<div className="bg-muted p-4 md:p-16 space-y-8 flex-1">
				<div className="space-y-2">
					<h1 className="font-bold text-5xl">My CVs</h1>
					<p className="text-muted-foreground text-lg">
						Manage and optimize your professional CVs for maximum ATS
						compatibility.
					</p>
				</div>
				<StatisticSection />
				<ListCVs />
			</div>
		</section>
	);
}

function Header() {
	const user = {
		firstName: "John",
		lastName: "Doe",
		profilePictureURL: undefined,
	};

	return (
		<header className="py-4 px-8 md:py-8 md:px-16 border-b flex flex-row items-center justify-between">
			<div className="flex flex-row gap-2 items-center">
				<div className="bg-primary size-12 rounded-lg" />
				<span className="text-2xl font-semibold">Profolio</span>
			</div>
			<div className="flex flex-row gap-4 items-center">
				<span>
					Welcome back, <span className="font-semibold">{user.firstName}</span>
				</span>
				<Avatar>
					<AvatarImage src={user.profilePictureURL} alt="Profile Picture" />
					<AvatarFallback>
						{user.firstName[0]}
						{user.lastName[0]}
					</AvatarFallback>
				</Avatar>
			</div>
		</header>
	);
}

function StatisticSection() {
	return (
		<div className="grid md:grid-cols-2 md:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 gap-y-4 gap-x-8">
			<StatisticCard
				title="Total CVs"
				value="3"
				icon={
					<div className="p-4 rounded-lg bg-blue-100">
						<FileTextIcon className="text-blue-600" />
					</div>
				}
			/>
			<StatisticCard
				title="Total CVs"
				value="3"
				icon={
					<div className="p-4 rounded-lg bg-blue-100">
						<FileTextIcon className="text-blue-600" />
					</div>
				}
			/>
			<StatisticCard
				title="Total CVs"
				value="3"
				icon={
					<div className="p-4 rounded-lg bg-blue-100">
						<FileTextIcon className="text-blue-600" />
					</div>
				}
			/>
			<StatisticCard
				title="Total CVs"
				value="3"
				icon={
					<div className="p-4 rounded-lg bg-blue-100">
						<FileTextIcon className="text-blue-600" />
					</div>
				}
			/>
		</div>
	);
}

function StatisticCard({
	title,
	value,
	icon,
}: { title: string; value: string; icon: ReactNode }) {
	return (
		<div className="bg-background border rounded-lg p-8 flex flex-row justify-between items-center">
			<div className="flex flex-col gap-2">
				<span className="text-muted-foreground text-xl font-semibold">
					{title}
				</span>
				<span className="font-extrabold text-3xl">{value}</span>
			</div>
			{icon}
		</div>
	);
}

function CVCard() {
	return (
		<div className="bg-background border rounded-lg p-8 flex flex-col gap-4">
			<div className="flex flex-row justify-between gap-12 items-center">
				<h4 className="font-bold text-xl">Software Engineer CV</h4>
				<Button size="icon" variant="ghost">
					<EllipsisVerticalIcon />
				</Button>
			</div>
			<div className="flex flex-row justify-between items-center">
				<Badge variant="default">
					<CheckCircleIcon />
					Completed
				</Badge>
				<div className="flex flex-col">
					<span className="text-sm text-muted-foreground">ATS Score</span>
					<span className="font-semibold text-lg text-right">94%</span>
				</div>
			</div>
			<span className="text-xs text-muted-foreground flex flex-row gap-2 items-center">
				<CalendarIcon className="size-4" />
				Modified{" "}
				{Intl.DateTimeFormat("en-US", {
					day: "numeric",
					month: "numeric",
					year: "numeric",
				}).format(new Date())}
			</span>
			<div className="flex flex-row gap-2">
				<Button className="flex-1" variant="outline">
					<EditIcon /> Edit
				</Button>
				<Button className="flex-1" variant="outline">
					<DownloadIcon /> Download
				</Button>
			</div>
		</div>
	);
}

function ListCVs() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-2 justify-between items-center">
				<div className="flex flex-row gap-2">
					<div className="relative">
						<Input
							className=" bg-white peer ps-9"
							placeholder="Search CVs..."
						/>
						<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
							<SearchIcon size={16} aria-hidden="true" />
						</div>
					</div>

					<Select>
						<SelectTrigger className=" bg-white relative ps-9">
							<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 group-has-[select[disabled]]:opacity-50">
								<FilterIcon size={16} aria-hidden="true" />
							</div>
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{CVStatusArray.map((cvStatus) => {
									return (
										<SelectItem key={cvStatus.key} value={cvStatus.key}>
											{cvStatus.value}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<Button>
					<PlusIcon />
					<span className="hidden sm:inline">Create New CV</span>
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
				<CVCard />
				<CVCard />
				<CVCard />
				<CVCard />
			</div>
		</div>
	);
}
