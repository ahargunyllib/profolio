"use client";

import type { TRegisterRequest } from "@/shared/repositories/auth/dto";
import { useRegisterMutation } from "@/shared/repositories/auth/query";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useRegisterForm = () => {
	const { mutate: register, isPending } = useRegisterMutation();
	const router = useRouter();

	const form = useForm<TRegisterRequest>({
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			password: "",
		},
	});

	const onSubmitHandler = form.handleSubmit((data) => {
		register(data, {
			onSuccess(res) {
				if (!res.success) {
					toast.error(res.message);
					return;
				}

				toast.success(res.message);

				router.push("/login");
			},
		});
	});

	return {
		...form,
		onSubmitHandler,
		isLoading: isPending,
	};
};
