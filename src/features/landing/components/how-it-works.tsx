import { Button } from "@/shared/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { datas } from "../data/how-it-works";

export default function HowItWorks() {
	return (
		<section
			id="how-it-works"
			className="relative p-8 pb-4 lg:p-24 pt-34 lg:pt-34  gap-15 flex flex-col  w-full"
		>
			<div className="absolute -top-60 -right-110  -z-10">
				<Image src="/bg-shadow.png" alt="shadow" width={700} height={700} />
			</div>
			<div className="absolute -bottom-60 -left-110  -z-10">
				<Image src="/bg-shadow.png" alt="shadow" width={700} height={700} />
			</div>
			<div className="w-full text-center flex flex-col gap-3">
				<h1 className="text-2xl lg:text-4xl font-bold">
					How ATS Optimization Works
				</h1>
				<p className="text-gray-500 text-base">
					Our proven 4-step process ensures your CV passes ATS screening and
					reaches human recruiters.
				</p>
			</div>

			<div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-5  ">
				{/* Card */}
				{datas.map((data) => (
					<div
						key={data.id}
						className="p-4 py-6  h-full flex flex-col justify-start items-center rounded-md gap-3 "
					>
						<div className="w-10 h-10 items-center justify-center flex  bg-primary/12 rounded-full text-primary">
							<p>{data.id}</p>
						</div>

						<h1 className="text-center font-bold">{data.title}</h1>
						<p className="text-center text-sm text-gray-500">{data.desc}</p>
					</div>
				))}
				<div className="col-span-2 lg:col-span-4 flex justify-center mt-4">
					<Link href="/dashboard">
						<Button className="cursor-pointer">
							{" "}
							Start ATS Optimization
							<ArrowRight />
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
