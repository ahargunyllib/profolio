"use client";

import { useGetMyCVByIdQuery } from "@/shared/repositories/cvs/query";
import type { CV } from "@/shared/types";
import { notFound } from "next/navigation";
import CVEditorContainer from "./cv-editor-container";

type Props = {
	id: CV["id"];
};
export default function EditCVContainer({ id }: Props) {
	const { data: res, isLoading } = useGetMyCVByIdQuery(id);

	if (isLoading) return <div>Loading...</div>;

	if (!res?.success) {
		notFound();
	}

	const cv = res.data;

	return <CVEditorContainer cv={cv} />;
}
