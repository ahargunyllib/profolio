import { Lusitana, Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
	variable: "--font-plus-jakarta-sans",
	subsets: ["latin"],
});

const lusitana = Lusitana({
	variable: "--font-lusitana",
	subsets: ["latin"],
	weight: ["400", "700"],
	display: "swap",
});

export const fontVariables = `${plusJakartaSans.variable} ${lusitana.variable}`;
