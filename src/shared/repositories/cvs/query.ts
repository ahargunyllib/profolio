"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import type { CV } from "../../types";
import {
	createCV,
	deleteCV,
	generateGrade,
	generatePoints,
	generateSummaries,
	getMyCVById,
	getMyCVs,
	updateCV,
} from "./action";
import type { TCreateCVRequest, TUpdateCVRequest } from "./dto";

export const useGeneratePointsMutation = () => {
	return useMutation({
		mutationFn: (data: TCreateCVRequest["data"]["jobExperiences"][number]) =>
			generatePoints(data),
	});
};

export const useGenerateGradeMutation = () => {
	return useMutation({
		mutationFn: (data: TCreateCVRequest) => generateGrade(data),
	});
};

export const useGenerateSummariesMutation = () => {
	return useMutation({
		mutationFn: (data: TCreateCVRequest) => generateSummaries(data),
	});
};

export const useGetMyCVsQuery = () => {
	const searchParams = useSearchParams();
	const search = searchParams.get("search");
	const statusStr = searchParams.get("status");
	const status = statusStr ? Number.parseInt(statusStr) : null;

	const query = {
		search,
		status,
	};

	console.log(query, "query.ts");

	return useQuery({
		queryKey: ["cvs", query],
		queryFn: () => getMyCVs(query),
	});
};

export const useGetMyCVByIdQuery = (id: CV["id"]) => {
	return useQuery({
		queryKey: ["cvs", id],
		queryFn: () => getMyCVById(id),
		enabled: !!id,
	});
};

export const useCreateCVMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["cvs"],
		mutationFn: (data: TCreateCVRequest) => createCV(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cvs"] });
		},
	});
};

export const useUpdateCVMutation = (id: CV["id"]) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["cvs"],
		mutationFn: (data: TUpdateCVRequest) => updateCV(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cvs", id] });
		},
	});
};

export const useDeleteCVMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["cvs"],
		mutationFn: (id: CV["id"]) => deleteCV(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cvs"] });
		},
	});
};
