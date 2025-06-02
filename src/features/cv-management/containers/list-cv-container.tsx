"use client";

import { useGetMyCVsQuery } from "@/shared/repositories/cvs/query";
import CVCard from "../components/cv-card";

export default function ListCVContainer() {
	const { data: res, isLoading, error } = useGetMyCVsQuery();

	return isLoading ? (
		<div className="col-span-3 text-center text-muted-foreground">
			Loading CVs...
		</div>
	) : error ? (
		<div className="col-span-3 text-center text-red-500">
			Error loading CVs: {error.message}
		</div>
	) : !res ? (
		<div className="col-span-3 text-center text-muted-foreground">
			No CVs found.
		</div>
	) : !res.success ? (
		<div className="col-span-3 text-center text-red-500">{res.message}</div>
	) : !res.data || res.data.length === 0 ? (
		<div className="col-span-3 text-center text-muted-foreground">
			No CVs found.
		</div>
	) : (
		res.data.map((cv) => <CVCard key={cv.id} cv={cv} />)
	);
}
