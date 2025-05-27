import { ModeToggle } from "@/shared/components/mode-toggle";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { ChevronLeftIcon } from "lucide-react";

export default function Page() {
	return (
		<section className="flex flex-col gap-4 items-center min-h-screen p-8 pb-20">
			<Card className="w-full max-w-2xl">
				<CardHeader>
					<CardTitle className="text-3xl">
						Design System <ModeToggle />
					</CardTitle>
					<CardDescription>
						This is a design system page that serves as a comprehensive
						implementation of all the style guide elements defined in our Figma
						design files. It is intended to provide a centralized reference for
						developers and designers to ensure consistency across the
						application. This page is strictly accessible only when the
						environment is set to development, as it is meant for internal use
						and testing purposes. By adhering to this guide, we aim to maintain
						a cohesive and user-friendly interface throughout the project.
					</CardDescription>
				</CardHeader>
			</Card>

			<TypographyCard />
			<ColorCard />
			<ButtonCard />
		</section>
	);
}

function TypographyCard() {
	const data = [
		{
			name: "Text 9 XL",
			fontSize: "128",
			lineHeight: "100%",
			letterSpacing: "0%",
			className: "text-9xl",
		},
	];

	return (
		<Card className="w-full max-w-2xl">
			<CardHeader>
				<CardTitle className="text-2xl">
					<span className="text-slate-400 mr-2 text-9x">01.</span>Typography
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-8 break-words">
				<div>
					<div className="flex flex-row gap-4">
						<h3 className="text-4xl">Ag</h3>
						<div>
							<span className="text-lg font-bold">Work Sans</span>
							<p className="text-xs text-foreground/40">Google Fonts</p>
						</div>
					</div>
				</div>

				{data.map((item) => {
					return (
						<div className="flex flex-col gap-6" key={item.className}>
							<div className="flex md:flex-row md:justify-between flex-col justify-start">
								<span className="text-xs text-blue-500">
									{item.name} (<code>{item.className}</code>)
								</span>
								<div className="text-xs text-slate-400">
									{`Font Size: ${item.fontSize} | Line Height: ${item.lineHeight} | Letter Spacing: ${item.letterSpacing}`}
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="flex flex-col gap-1">
									<span className="text-xs text-slate-500">Regular</span>
									<span className={cn("font-normal", item.className)}>
										{item.name}
									</span>
								</div>
								<div className="flex flex-col gap-1">
									<span className="text-xs text-slate-500">Medium</span>
									<span className={cn("font-medium", item.className)}>
										{item.name}
									</span>
								</div>
								<div className="flex flex-col gap-1">
									<span className="text-xs text-slate-500">Semi Bold</span>
									<span className={cn("font-semibold", item.className)}>
										{item.name}
									</span>
								</div>
								<div className="flex flex-col gap-1">
									<span className="text-xs text-slate-500">Bold</span>
									<span className={cn("font-bold", item.className)}>
										{item.name}
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}

function ColorCard() {
	const data = [
		{
			name: "ShadCN Theme (Light)",
			children: [
				{
					name: "Background",
					className: "bg-background",
				},
				{
					name: "Foreground",
					className: "bg-foreground",
				},
				{
					name: "Card",
					className: "bg-card",
				},
				{
					name: "Card Foreground",
					className: "bg-card-foreground",
				},
				{
					name: "Popover",
					className: "bg-popover",
				},
				{
					name: "Popover Foreground",
					className: "bg-popover-foreground",
				},
				{
					name: "Primary",
					className: "bg-primary",
				},
				{
					name: "Primary Foreground",
					className: "bg-primary-foreground",
				},
				{
					name: "Secondary",
					className: "bg-secondary",
				},
				{
					name: "Secondary Foreground",
					className: "bg-secondary-foreground",
				},
				{
					name: "Muted",
					className: "bg-muted",
				},
				{
					name: "Muted Foreground",
					className: "bg-muted-foreground",
				},
				{
					name: "Accent",
					className: "bg-accent",
				},
				{
					name: "Accent Foreground",
					className: "bg-accent-foreground",
				},
				{
					name: "Destructive",
					className: "bg-destructive",
				},
				{
					name: "Border",
					className: "bg-border",
				},
				{
					name: "Input",
					className: "bg-input",
				},
				{
					name: "Ring",
					className: "bg-ring",
				},
				{
					name: "Chart 1",
					className: "bg-chart-1",
				},
				{
					name: "Chart 2",
					className: "bg-chart-2",
				},
				{
					name: "Chart 3",
					className: "bg-chart-3",
				},
				{
					name: "Chart 4",
					className: "bg-chart-4",
				},
				{
					name: "Chart 5",
					className: "bg-chart-5",
				},
				{
					name: "Sidebar",
					className: "bg-sidebar",
				},
				{
					name: "Sidebar Foreground",
					className: "bg-sidebar-foreground",
				},
				{
					name: "Sidebar Primary",
					className: "bg-sidebar-primary",
				},
				{
					name: "Sidebar Primary Foreground",
					className: "bg-sidebar-primary-foreground",
				},
				{
					name: "Sidebar Accent",
					className: "bg-sidebar-accent",
				},
				{
					name: "Sidebar Accent Foreground",
					className: "bg-sidebar-accent-foreground",
				},
				{
					name: "Sidebar Border",
					className: "bg-sidebar-border",
				},
				{
					name: "Sidebar Ring",
					className: "bg-sidebar-ring",
				},
			],
		},
	];

	return (
		<Card className="w-full max-w-2xl">
			<CardHeader>
				<CardTitle className="text-2xl">
					<span className="text-slate-400 mr-2">02.</span>Color
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-6">
				{data.map((item) => {
					return (
						<div className="flex flex-col gap-2" key={item.name}>
							<span className="text-xs text-blue-500">{item.name}</span>

							<div className="flex flex-row gap-2 flex-wrap">
								{item.children.map((child) => {
									return (
										<div
											className="flex flex-col gap-2 items-center"
											key={child.className}
										>
											<div
												className={cn(
													"size-20 rounded-md",
													child.className,
													"border border-slate-200",
												)}
											/>
											<span className="text-xs text-slate-500 text-pretty w-min">
												{child.name} (<code>{child.className}</code>)
											</span>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}

function ButtonCard() {
	return (
		<Card className="w-full max-w-2xl">
			<CardHeader>
				<CardTitle className="text-2xl">
					<span className="text-slate-400 mr-2">03.</span>Button
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-6">
				<div className="flex flex-col gap-6">
					<div className="flex md:flex-row md:justify-between flex-col justify-start">
						<span className="text-xs text-blue-500">Primary Button</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Button>Button</Button>
						<Button disabled>Button</Button>
						<Button>
							<ChevronLeftIcon /> Button
						</Button>
						<Button disabled>
							<ChevronLeftIcon /> Button
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<div className="flex md:flex-row md:justify-between flex-col justify-start">
						<span className="text-xs text-blue-500">Secondary Button</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Button variant="secondary">Button</Button>
						<Button disabled variant="secondary">
							Button
						</Button>
						<Button variant="secondary">
							<ChevronLeftIcon /> Button
						</Button>
						<Button disabled variant="secondary">
							<ChevronLeftIcon /> Button
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<div className="flex md:flex-row md:justify-between flex-col justify-start">
						<span className="text-xs text-blue-500">Outline Button</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Button variant="outline">Button</Button>
						<Button disabled variant="outline">
							Button
						</Button>
						<Button variant="outline">
							<ChevronLeftIcon /> Button
						</Button>
						<Button disabled variant="outline">
							<ChevronLeftIcon /> Button
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<div className="flex md:flex-row md:justify-between flex-col justify-start">
						<span className="text-xs text-blue-500">Ghost Button</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Button variant="ghost">Button</Button>
						<Button disabled variant="ghost">
							Button
						</Button>
						<Button variant="ghost">
							<ChevronLeftIcon /> Button
						</Button>
						<Button disabled variant="ghost">
							<ChevronLeftIcon /> Button
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<div className="flex md:flex-row md:justify-between flex-col justify-start">
						<span className="text-xs text-blue-500">Link Button</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Button variant="link">Button</Button>
						<Button disabled variant="link">
							Button
						</Button>
						<Button variant="link">
							<ChevronLeftIcon /> Button
						</Button>
						<Button disabled variant="link">
							<ChevronLeftIcon /> Button
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<div className="flex md:flex-row md:justify-between flex-col justify-start">
						<span className="text-xs text-blue-500">Destructive Button</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Button variant="destructive">Button</Button>
						<Button disabled variant="destructive">
							Button
						</Button>
						<Button variant="destructive">
							<ChevronLeftIcon /> Button
						</Button>
						<Button disabled variant="destructive">
							<ChevronLeftIcon /> Button
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
