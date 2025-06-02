import useDebounce from "@/shared/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useFilterCVs = () => {
	const searchParams = useSearchParams();
	const _search = searchParams.get("search") || "";
	const _status = searchParams.get("status") || "0";

	const [filter, setFilter] = useState({
		search: _search,
		status: Number.parseInt(_status),
	});
	const debouncedFilter = useDebounce(filter, 500);

	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(searchParams);
		if (debouncedFilter.search) {
			urlSearchParams.set("search", debouncedFilter.search);
		} else {
			urlSearchParams.delete("search");
		}

		if (debouncedFilter.status) {
			urlSearchParams.set("status", debouncedFilter.status.toString());
		} else {
			urlSearchParams.delete("status");
		}

		console.log("useFilterCVs", debouncedFilter);

		router.replace(`${pathname}?${urlSearchParams.toString()}`);
	}, [debouncedFilter, router, pathname, searchParams]);

	return {
		filter,
		setFilter,
		debouncedFilter,
	};
};
