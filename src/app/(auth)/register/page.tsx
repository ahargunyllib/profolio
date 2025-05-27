"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Page() {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);
	return (
		<section className="p-20 h-screen flex flex-row gap-36">
			<div className="w-full flex flex-col gap-[24px]">
				<div className="flex flex-row gap-[20px] items-center ">
					<Image
						src="/profolio-logo.png"
						alt="profolio"
						width={72}
						height={72}
					/>
					<h1 className="font-semibold text-2xl">Profolio</h1>
				</div>

				<div>
					<h1 className="font-semibold text-2xl">Get Started</h1>
					<p className="text-md">
						Welcome to Profolio - Let’s create your account
					</p>
				</div>

				<div className="w-full flex flex-col gap-[12px]">
					<Label>Email</Label>
					<Input type="email" placeholder="Enter your email address" />
				</div>

				<div className="w-full flex flex-col gap-[12px]">
					<Label>First Name</Label>
					<Input placeholder="Enter your first name" />
				</div>

				<div className="w-full flex flex-col gap-[12px]">
					<Label>Last Name</Label>
					<Input placeholder="Enter your last name" />
				</div>

				<div className="w-full flex flex-col gap-[12px]">
					<Label>Password</Label>
					<div className="relative">
						<Input
							className="pe-9"
							placeholder="Password"
							type={isVisible ? "text" : "password"}
						/>
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
				</div>

				<div className="w-full flex flex-col gap-[8px]">
					<Button className="cursor-pointer w-full">Sign Up</Button>
					<p className="text-center text-md  ">
						Already have an account ?{" "}
						<Link href="/login" className="cursor-pointer text-primary font">
							Sign in
						</Link>
					</p>
				</div>
			</div>

			<div className="hidden lg:flex lg:flex-col w-full relative bg-primary p-[40px] rounded-xl justify-end">
				<Image
					src="/profolio-ilustrator.svg"
					alt="profolio"
					fill
					className="p-28"
				/>
				<h1 className="text-3xl font-semibold text-white self-end  text-end z-10">
					Welcome to Profolio!
				</h1>
				<h2 className="text-2xl font-semibold text-white self-end text-end z-10">
					Make your CV Easier and Organized with us
				</h2>
			</div>
		</section>
	);
}
