"use client";

import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";

type RollingNumberProps = {
	value: number;
	duration?: number;
	className?: string;
	prefix?: string;
	suffix?: string;
	decimals?: number;
};

export function RollingNumber({
	value,
	duration = 2000,
	className,
	prefix = "",
	suffix = "",
	decimals = 0,
}: RollingNumberProps) {
	const [displayValue, setDisplayValue] = useState(0);

	useEffect(() => {
		let startTime: number | null = null;
		const startValue = displayValue;

		const step = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);

			// Easing function: easeOutExpo
			const easeProgress = progress === 1 ? 1 : 1 - 2 ** (-10 * progress);

			setDisplayValue(startValue + easeProgress * (value - startValue));

			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};

		window.requestAnimationFrame(step);

		return () => {
			startTime = null;
		};
	}, [value, duration, displayValue]);

	return (
		<div
			className={cn("font-mono text-4xl font-bold tabular-nums", className)}
			aria-live="polite"
		>
			{prefix}
			{displayValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
			{suffix}
		</div>
	);
}
