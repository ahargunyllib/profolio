"use client";

import {
	LoginSchema,
	type TLoginRequest,
} from "@/shared/repositories/auth/dto";
import { useLoginMutation } from "@/shared/repositories/auth/query";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useLoginForm = () => {
	const { mutate: login, isPending } = useLoginMutation();
	const router = useRouter();

	const form = useForm<TLoginRequest>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmitHandler = form.handleSubmit((data) => {
		login(data, {
			onSuccess(res) {
				if (!res.success) {
					toast.error(res.message);
					return;
				}

				toast.success(res.message);

				router.push("/dashboard");
			},
		});
	});

	return {
		...form,
		isLoading: isPending,
		onSubmitHandler,
	};
};
