import type React from "react";
import Navbar from "./Navbar";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className=" ">
			<Navbar />
			{children}
		</section>
	);
}
