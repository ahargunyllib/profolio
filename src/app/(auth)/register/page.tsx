import { RegisterForm } from "@/features/auth/components/register-form";
import Image from "next/image";
export default function Page() {
	return (
		<section className="p-20 h-screen flex flex-row gap-36">
			<div className="w-full flex flex-col gap-6">
				<div className="flex flex-row gap-5 items-center ">
					<Image
						src="/profolio-logo.png"
						alt="profolio"
						width={72}
						height={72}
					/>
					<h1 className="font-semibold text-2xl">Profolio</h1>
				</div>

				<div>
					<h1 className="font-semibold text-2xl">Get Started</h1>
					<p className="text-md">
						Welcome to Profolio - Let&apos;s create your account
					</p>
				</div>

				<RegisterForm />
			</div>

			<div className="hidden lg:flex lg:flex-col w-full relative bg-primary p-[40px] rounded-xl justify-end">
				<Image
					src="/profolio-ilustrator.svg"
					alt="profolio"
					fill
					className="p-28"
				/>
				<h1 className="text-3xl font-semibold text-white self-end  text-end z-10">
					Welcome to Profolio!
				</h1>
				<h2 className="text-2xl font-semibold text-white self-end text-end z-10">
					Make your CV Easier and Organized with us
				</h2>
			</div>
		</section>
	);
}
