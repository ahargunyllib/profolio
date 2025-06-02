import "../shared/styles/global.css";
import type { Metadata } from "next";
import Provider from "../shared/components/providers";
import { fontVariables } from "../shared/lib/fonts";

export const metadata: Metadata = {
	title: "Profolio",
	description:
		"Profolio adalah aplikasi web untuk membuat, mengelola, dan mengoptimasi CV secara online dengan fitur ATS, AI summary, dan template profesional.",
	openGraph: {
		title: "Profolio",
		description:
			"Buat dan optimasi CV profesional secara mudah dan cepat dengan Profolio.",
		url: "https://profolio.ahargunyllib.dev",
		siteName: "Profolio",
		images: [
			{
				url: "https://profolio.ahargunyllib.dev/profolio-logo.png",
				width: 800,
				height: 600,
			},
		],
		locale: "id-ID",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Profolio",
		description:
			"Buat dan optimasi CV profesional secara mudah dan cepat dengan Profolio.",
		site: "@profolioapp",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head lang="en">
				<link rel="icon" href="/profolio-logo.png" sizes="any" />
			</head>
			<body className={`${fontVariables} antialiased`}>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
