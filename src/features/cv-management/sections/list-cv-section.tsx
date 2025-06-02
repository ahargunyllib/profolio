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
import { FilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import ListCVContainer from "../containers/list-cv-container";

export default function ListCVSection() {
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
				<Button asChild>
					<Link href="/dashboard/cv-builder">
						<PlusIcon />
						<span className="hidden sm:inline">Create New CV</span>
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
				<ListCVContainer />
			</div>
		</div>
	);
}
