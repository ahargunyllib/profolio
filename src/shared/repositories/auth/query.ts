"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie, setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSession } from "../session-manager/action";
import { getMySession, login, logout, register } from "./action";
import type { TLoginRequest, TRegisterRequest } from "./dto";

export const useLoginMutation = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const returnTo = getCookie("returnTo");

	return useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: TLoginRequest) => login(data),
		onSuccess: async (res) => {
			if (!res.success) {
				toast.error(res.message);
				return;
			}

			toast.success(res.message);
			await createSession(res.data.access_token);
			router.replace(returnTo || "/dashboard");
			setCookie("returnTo", "");

			queryClient.refetchQueries({ queryKey: ["auth"] });
		},
	});
};

export const useLogoutMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["auth"],
		mutationFn: () => logout(),
		onSuccess: () => {
			queryClient.resetQueries({ queryKey: ["auth"] });
		},
	});
};

export const useRegisterMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: TRegisterRequest) => register(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth"] });
		},
	});
};

export const useGetMySessionQuery = () => {
	return useQuery({
		queryKey: ["auth"],
		queryFn: getMySession,
	});
};
