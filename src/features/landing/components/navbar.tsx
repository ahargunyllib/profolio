"use client";

import { Button } from "@/shared/components/ui/button";
import { MenuIcon, X } from "lucide-react";
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
						variant="outline"
						size="icon"
						onClick={() => setOpen((prev) => !prev)}
						aria-expanded={open}
						aria-label={open ? "Close menu" : "Open menu"}
					>
						<div className="relative w-4 h-4">
							<MenuIcon
								className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${
									open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
								}`}
							/>
							<X
								className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${
									open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
								}`}
							/>
						</div>
					</Button>
				</div>
			</nav>

			{/* Mobile Menu with Slide Down Animation */}
			<div
				className={`lg:hidden mt-2 bg-white rounded-md shadow-md overflow-hidden transition-all duration-300 ease-out origin-top ${
					open ? "h-auto scale-y-100 opacity-100" : "h-0 scale-y-0 opacity-0"
				}`}
				style={{
					transformOrigin: "top",
				}}
			>
				<div
					className={`p-4 flex flex-col gap-4 transition-all duration-300 delay-100 ${
						open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
					}`}
				>
					<Link
						href="#features"
						className="hover:text-primary text-center text-sm py-2 border-b border-gray-200 transition-colors duration-200"
						onClick={() => setOpen(false)}
					>
						Features
					</Link>
					<Link
						href="#how-it-works"
						className="hover:text-primary text-center text-sm py-1 border-b border-gray-200 transition-colors duration-200"
						onClick={() => setOpen(false)}
					>
						How It Works
					</Link>
					<Link
						href="#testimonials"
						className="hover:text-primary text-center text-sm py-1 border-b border-gray-200 transition-colors duration-200"
						onClick={() => setOpen(false)}
					>
						Testimonials
					</Link>
					<Link href="/login" onClick={() => setOpen(false)}>
						<Button
							variant="outline"
							className="text-primary border-primary w-full text-sm transition-colors duration-200"
						>
							Sign in
						</Button>
					</Link>
					<Link href="/register" onClick={() => setOpen(false)}>
						<Button className="w-full text-sm transition-colors duration-200">
							Sign up
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
