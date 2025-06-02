import { Button } from "@/shared/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import FilterCV from "../components/filter-cv";
import ListCVContainer from "../containers/list-cv-container";

export default function ListCVSection() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-2 justify-between items-center">
				<FilterCV />
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
