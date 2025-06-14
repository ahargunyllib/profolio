"use client";

import { Button } from "@/shared/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLoginForm } from "../hooks/use-login-form";

export function LoginForm() {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	const form = useLoginForm();

	return (
		<Form {...form}>
			<form onSubmit={form.onSubmitHandler} className="flex flex-col gap-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => {
						return (
							<FormItem className="w-full flex flex-col gap-3">
								<FormLabel htmlFor="email">Email</FormLabel>
								<FormControl>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email address"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => {
						return (
							<FormItem className="w-full flex flex-col gap-3">
								<FormLabel htmlFor="password">Password</FormLabel>
								<div className="relative">
									<FormControl>
										<Input
											id="password"
											className="pe-9"
											placeholder="Password"
											type={isVisible ? "text" : "password"}
											{...field}
										/>
									</FormControl>
									<button
										className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
										type="button"
										onClick={toggleVisibility}
										aria-label={isVisible ? "Hide password" : "Show password"}
										aria-pressed={isVisible}
										aria-controls="password"
									>
										{isVisible ? (
											<EyeOffIcon size={16} aria-hidden="true" />
										) : (
											<EyeIcon size={16} aria-hidden="true" />
										)}
									</button>
								</div>
								<FormMessage />
							</FormItem>
						);
					}}
				/>

				<div className="w-full flex flex-col gap-2">
					<Button
						type="submit"
						className="cursor-pointer w-full"
						disabled={form.isLoading}
					>
						Sign In
					</Button>
					<p className="text-center text-md ">
						Don&apos;t have an account?{" "}
						<Link href="/register" className="cursor-pointer text-primary font">
							Sign up
						</Link>
					</p>
				</div>
			</form>
		</Form>
	);
}
