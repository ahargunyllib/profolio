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
import { useRegisterForm } from "../hooks/use-register-form";

export function RegisterForm() {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	const form = useRegisterForm();

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
					name="firstName"
					render={({ field }) => {
						return (
							<FormItem className="w-full flex flex-col gap-3">
								<FormLabel htmlFor="firstName">First Name</FormLabel>
								<FormControl>
									<Input
										id="firstName"
										placeholder="Enter your first name"
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
					name="lastName"
					render={({ field }) => {
						return (
							<FormItem className="w-full flex flex-col gap-3">
								<FormLabel htmlFor="lastName">Last Name</FormLabel>
								<FormControl>
									<Input
										id="lastName"
										placeholder="Enter your last name"
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
										type="button"
										onClick={toggleVisibility}
										className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
									>
										{isVisible ? <EyeOffIcon /> : <EyeIcon />}
									</button>
								</div>
								<FormMessage />
							</FormItem>
						);
					}}
				/>

				<div className="w-full flex flex-col gap-2">
					<Button
						className="cursor-pointer w-full"
						type="submit"
						disabled={form.isLoading}
					>
						Sign Up
					</Button>
					<p className="text-center text-md  ">
						Already have an account?{" "}
						<Link href="/login" className="cursor-pointer text-primary font">
							Sign in
						</Link>
					</p>
				</div>
			</form>
		</Form>
	);
}
