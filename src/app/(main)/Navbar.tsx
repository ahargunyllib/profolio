"use client";

import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div className="fixed px-8 lg:px-24 py-12 z-10 w-full">
			<nav className="w-full flex justify-between bg-white/75 backdrop-blur-md shadow-md rounded-[12px] p-2 px-4 lg:py-3 items-center ">
				<div className="w-full flex  ">
					<Link href="#" className="flex items-center gap-2 ">
						<Image
							src="/profolio-logo.png"
							alt="profolio"
							width={40}
							height={40}
						/>
						<h1 className="text-base lg:text-lg w-fit font-semibold">
							Profolio
						</h1>
					</Link>
				</div>
				<ul className="hidden lg:flex gap-8 w-full justify-center">
					<Link href="#features" className="cursor-pointer hover:text-primary">
						Features
					</Link>
					<Link
						href="#how-it-works"
						className="cursor-pointer hover:text-primary"
					>
						How It Works
					</Link>
					<Link
						href="#testimonials"
						className="cursor-pointer hover:text-primary"
					>
						Testimonials
					</Link>
				</ul>

				<div className="hidden lg:flex gap-2 w-full justify-end">
					<Link href="/login">
						<Button variant="outline" className="text-primary border-primary ">
							Sign in
						</Button>
					</Link>
					<Link href="/register">
						<Button>Sign up</Button>
					</Link>
				</div>

				{/* Hamburger Button (mobile only) */}
				<div className="lg:hidden flex items-center ">
					<Button
						className="group"
						variant="outline"
						size="icon"
						onClick={() => setOpen((prev) => !prev)}
						aria-expanded={open}
						aria-label={open ? "Close menu" : "Open menu"}
					>
						<svg
							className="pointer-events-none"
							width={24}
							height={24}
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>anjay</title>
							<path
								d="M4 12L20 12"
								className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
							/>
							<path
								d="M4 12H20"
								className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
							/>
							<path
								d="M4 12H20"
								className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
							/>
						</svg>
					</Button>
				</div>
			</nav>

			{open && (
				<div className="lg:hidden mt-2 bg-white rounded-md shadow-md p-4 flex flex-col gap-4">
					<Link
						href="#features"
						className="hover:text-primary text-center text-sm py-2 border-b black "
						onClick={() => setOpen(false)}
					>
						Features
					</Link>
					<Link
						href="#how-it-works"
						className="hover:text-primary text-center text-sm py-1 border-b black "
						onClick={() => setOpen(false)}
					>
						How It Works
					</Link>
					<Link
						href="#testimonials"
						className="hover:text-primary text-center text-sm py-1 border-b black"
						onClick={() => setOpen(false)}
					>
						Testimonials
					</Link>
					<Link href="/login" onClick={() => setOpen(false)}>
						<Button
							variant="outline"
							className=" text-primary border-primary w-full text-sm"
						>
							Sign in
						</Button>
					</Link>
					<Link href="/register" onClick={() => setOpen(false)}>
						<Button className="w-full  text-sm">Sign up</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
