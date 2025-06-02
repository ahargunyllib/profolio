"use client";

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
import { FilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useFilterCVs } from "../hooks/use-filter-cvs";

export default function FilterCV() {
	const { setFilter, filter } = useFilterCVs();

	return (
		<div className="flex flex-row gap-2">
			<div className="relative">
				<Input
					className=" bg-white peer ps-9"
					placeholder="Search CVs..."
					onChange={(e) =>
						setFilter((prev) => ({
							...prev,
							search: e.target.value,
						}))
					}
				/>
				<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
					<SearchIcon size={16} aria-hidden="true" />
				</div>
			</div>

			<Select
				value={filter.status.toString()}
				onValueChange={(value) =>
					setFilter((prev) => ({ ...prev, status: Number.parseInt(value) }))
				}
			>
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

			{filter.status !== 0 && (
				<Button
					variant="destructive"
					onClick={() => setFilter({ search: "", status: 0 })}
				>
					<Trash2Icon />
				</Button>
			)}
		</div>
	);
}
