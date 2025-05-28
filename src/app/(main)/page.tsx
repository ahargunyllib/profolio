import Features from "./Features";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import Testimonials from "./Testimonials";
import HowItWorks from "./how-it-works";

export default function Home() {
	return (
		<>
			<LandingPage />
			<Features />
			<HowItWorks />
			<Testimonials />
			<Footer />
		</>
	);
}
