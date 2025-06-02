import Footer from "@/features/landing/components/footer";
import Navbar from "@/features/landing/components/navbar";
import type React from "react";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="overflow-x-hidden">
			<Navbar />
			{children}
			<Footer />
		</section>
	);
}
