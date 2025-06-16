import Home from "@/app/(main)/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/landing/components/landing-page", () => ({
	default: () => <div data-testid="landing-page">Landing Page</div>,
}));

vi.mock("@/features/landing/components/features", () => ({
	default: () => <div data-testid="features">Features</div>,
}));

vi.mock("@/features/landing/components/how-it-works", () => ({
	default: () => <div data-testid="how-it-works">How It Works</div>,
}));

vi.mock("@/features/landing/components/testimonials", () => ({
	default: () => <div data-testid="testimonials">Testimonials</div>,
}));

describe("Home Page", () => {
	it("renders all landing page sections", () => {
		render(<Home />);

		expect(screen.getByTestId("landing-page")).toBeDefined();
		expect(screen.getByTestId("features")).toBeDefined();
		expect(screen.getByTestId("how-it-works")).toBeDefined();
		expect(screen.getByTestId("testimonials")).toBeDefined();
	});
});
