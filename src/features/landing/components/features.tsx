import { ChartColumn, FileCheck, Search, Shield } from "lucide-react";
import Image from "next/image";

export default function Features() {
	const datas = [
		{
			id: 1,
			title: "Keyword Optimization",
			desc: "AI-powered keyword suggestions based on job descriptions to increase your ATS match rate by 85%.",
			icon: <Search className="text-primary" />,
		},
		{
			id: 2,
			title: "ATS-Safe Formatting",
			desc: "Templates designed to pass all major ATS systems including Workday, Greenhouse, and Lever.",
			icon: <Shield className="text-primary" />,
		},
		{
			id: 3,
			title: "Real-time ATS Score",
			desc: "Get instant feedback on your CV's ATS compatibility with detailed scoring and improvement tips.",
			icon: <ChartColumn className="text-primary" />,
		},
		{
			id: 4,
			title: "Format Compliance",
			desc: "Ensures proper heading structure, font choices, and layout that ATS systems can easily parse.",
			icon: <FileCheck className="text-primary" />,
		},
	];

	return (
		<section
			id="features"
			className="relative p-8 pb-4 lg:p-24 pt-34 lg:pt-34  gap-15 flex flex-col  w-full"
		>
			<div className="absolute -top-60 -left-110  -z-10">
				<Image src="/bg-shadow.png" alt="shadow" width={700} height={700} />
			</div>
			<div className="absolute -bottom-60 -right-110  -z-10">
				<Image src="/bg-shadow.png" alt="shadow" width={700} height={700} />
			</div>

			<div className="w-full text-center flex flex-col gap-3">
				<h1 className="text-2xl lg:text-4xl font-bold">
					Advanced ATS Optimization Features
				</h1>
				<p className="text-gray-500 text-base">
					Our AI-powered platform analyzes and optimizes your CV for maximum ATS
					compatibility across all major systems.
				</p>
			</div>

			<div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-5 justify-center">
				{/* Card */}
				{datas.map((data) => (
					<div
						key={data.id}
						className="p-4 py-6 bg-white shadow-lg h-full flex flex-col justify-center items-center rounded-md gap-3"
					>
						<div className="p-2 bg-primary/12 rounded-full">{data.icon}</div>

						<h1 className="text-center font-bold">{data.title}</h1>
						<p className="text-center text-sm text-gray-500">{data.desc}</p>
					</div>
				))}
			</div>
		</section>
	);
}
