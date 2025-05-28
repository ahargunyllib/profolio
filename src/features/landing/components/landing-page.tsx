import { Button } from "@/shared/components/ui/button";
import { ArrowRight, ChartLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PreviewLandingPage from "./preview-landing-page";

export default function LandingPage() {
	return (
		<section
			id="#"
			className="relative p-8 pb-4 pt-34 lg:pt-34  lg:p-24  gap-50 flex  w-full  "
		>
			<div className="absolute -top-60 -right-110  -z-10">
				<Image src="/bg-shadow.png" alt="shadow" width={700} height={700} />
			</div>
			<div className="absolute -bottom-60 -left-110  -z-10">
				<Image src="/bg-shadow.png" alt="shadow" width={700} height={700} />
			</div>

			<div className="w-full flex flex-col gap-6 justify-center">
				<div className="w-fit flex px-4 py-2 gap-3 bg-primary/12 rounded-xl ">
					<ChartLine width={16} height={16} className="text-primary" />
					<p className="text-primary text-xs">
						Supporting SDG 8: Decent Work & Economic Growth
					</p>
				</div>
				<h1 className="text-3xl lg:text-4xl font-bold ">
					Your Career Journey Starts With a Great{" "}
					<span className="text-primary">CV</span>{" "}
				</h1>

				<p className="text-gray-400 text-sm">
					Create professional CVs that stand out and help you land your dream
					job with our easy-to-use platform.
				</p>

				<div className="flex flex-row gap-4 w-full">
					<div className="flex flex-row gap-4 w-full">
						<Link href="/dashboard" className="flex-1 ">
							<Button className="w-full rounded-full flex items-center justify-center cursor-pointer">
								Create Your CV <ArrowRight />
							</Button>
						</Link>
						<Link href="/examples" className="flex-1 ">
							<Button
								className="w-full rounded-full flex items-center justify-center cursor-pointer border-primary text-primary"
								variant="outline"
							>
								See Example
							</Button>
						</Link>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<Image
						src="/ghufron-profile.png"
						alt="ghufron-profile"
						width={104}
						height={104}
					/>
					<p className="text-sm text-primary">
						10,000+{" "}
						<span className="text-gray-400">professionals trust profolio</span>
					</p>
				</div>
			</div>
			<div className="hidden md:flex w-full  items-center justify-end  ">
				<PreviewLandingPage />
			</div>
		</section>
	);
}
