import { Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-[#0A1B2A] text-white py-10 px-4 flex flex-col items-center ">
			{/* Logo & Brand */}
			<div className="flex items-center gap-2 mb-6 ">
				<Image
					src="/profolio-logo.png"
					alt="Profolio Logo"
					width={40}
					height={40}
				/>
				<span className="font-semibold text-lg ">Profolio</span>
			</div>
			{/* Navigation */}
			<ul className="flex flex-wrap justify-center gap-8  mb-6 text-base font-medium">
				<li>
					<Link href="#features" className=" font-semibold text-sm">
						Features
					</Link>
				</li>
				<li>
					<Link href="#how-it-works" className="font-semibold text-sm">
						How It Works
					</Link>
				</li>
				<li>
					<Link href="#testimonials" className=" font-semibold text-sm">
						Testimonials
					</Link>
				</li>
			</ul>
			{/* Social Media */}
			<div className="flex gap-6  justify-center mb-2 text-2xl">
				<Link
					href="https://instagram.com/"
					target="_blank"
					aria-label="Instagram"
				>
					<Instagram className=" transition" size={24} />
				</Link>
				<Link
					href="https://linkedin.com/"
					target="_blank"
					aria-label="LinkedIn"
				>
					<Linkedin className=" transition" size={24} />
				</Link>
				<Link href="https://youtube.com/" target="_blank" aria-label="YouTube">
					<Youtube className=" transition" size={24} />
				</Link>
			</div>
			{/* Copyright */}
			<p className="text-center text-xs text-gray-400 mt-4">
				&copy; {new Date().getFullYear()} Profolio. All rights reserved.
			</p>
		</footer>
	);
}
