import Features from "@/features/landing/components/features";
import HowItWorks from "@/features/landing/components/how-it-works";
import LandingPage from "@/features/landing/components/landing-page";
import Testimonials from "@/features/landing/components/testimonials";

export default function Home() {
	return (
		<>
			<LandingPage />
			<Features />
			<HowItWorks />
			<Testimonials />
		</>
	);
}
