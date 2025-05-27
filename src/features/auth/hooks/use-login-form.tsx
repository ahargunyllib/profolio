"use client";

import {
	LoginSchema,
	type TLoginRequest,
} from "@/shared/repositories/auth/dto";
import { useLoginMutation } from "@/shared/repositories/auth/query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useLoginForm = () => {
	const { mutate: login, isPending } = useLoginMutation();
	const form = useForm<TLoginRequest>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmitHandler = form.handleSubmit((data) => {
		login(data);
	});

	return {
		...form,
		isLoading: isPending,
		onSubmitHandler,
	};
};
