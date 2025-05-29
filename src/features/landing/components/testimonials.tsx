import { Quote, Star } from "lucide-react";
import Image from "next/image";
import { datas } from "../data/testimonials";

export default function Testimonials() {
	return (
		<section
			id="testimonials"
			className="relative px-8 pb-8 lg:p-24 pt-34 lg:pt-34  gap-15 flex flex-col  w-full"
		>
			<div className="absolute -top-60 -left-110  -z-10">
				<Image src="/bg-shadow.png" alt="shadow" width={700} height={700} />
			</div>
			<div className="absolute -bottom-60 -right-110  -z-10">
				<Image src="/bg-shadow.png" alt="shadow" width={700} height={700} />
			</div>
			<div className="w-full text-center flex flex-col gap-3">
				<h1 className="text-2xl lg:text-4xl font-bold">
					Success Stories from Our Users
				</h1>
				<p className="text-gray-500 text-base">
					Join thousands of professionals who have transformed their careers
					with Profolio's ATS optimization tools.
				</p>
			</div>

			<div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 justify-center">
				{/* Card */}
				{datas.map((data) => (
					<div
						key={data.id}
						className="relative p-4 py-6 bg-white shadow-lg h-full flex flex-col justify-center items-center rounded-md gap-5"
					>
						<Quote
							className="absolute text-primary opacity-40 left-3 top-30
            "
						/>
						<div className="w-full flex gap-4">
							<div
								className="relative w-18 h-18 bg-gray-400
              rounded-full flex items-center justify-center"
							>
								<Image
									src={data.profilePicture}
									alt={data.name}
									className="rounded-full"
									fill
								/>
							</div>
							<div className="flex flex-col gap-2">
								<div className="flex flex-row gap-3">
									<p className="font-semibold text-xs">{data.name}</p>
									<div className="flex flex-row gap-1 items-center ">
										{Array.from({ length: data.rating }).map((_, i) => (
											<Star
												key={`${data.id}-star-${i}`}
												className="w-4 h-4 text-yellow-400 fill-yellow-400"
											/>
										))}{" "}
									</div>
								</div>

								<div className="flex flex-col">
									<p className="text-gray-500 text-xs font-medium">
										{data.job}
									</p>
									<p className="text-primary text-xs font-medium">
										{data.company}
									</p>
								</div>

								<p className=" px-2 rounded-full bg-green-700/12 text-green-700 text-xs font-semibold w-fit">
									{data.highlight}
								</p>
							</div>
						</div>
						<div className="w-full flex  px-8">
							<p className="italic text-xs text-gray-500 font-medium">
								{data.review}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
