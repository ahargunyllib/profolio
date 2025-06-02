import { buttonVariants } from "@/shared/components/ui/button";
import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperSeparator,
	StepperTrigger,
} from "@/shared/components/ui/stepper";
import { cn } from "@/shared/lib/utils";
import { CheckCircleIcon, CircleIcon } from "lucide-react";
import { steps } from "../data/steps";

export default function CVEditorStepper({
	currentStep,
	setCurrentStep,
}: {
	currentStep: number;
	setCurrentStep: (step: number) => void;
}) {
	return (
		<Stepper value={currentStep} onValueChange={setCurrentStep}>
			{steps.map(({ step, icon, title }) => {
				const Icon = icon;
				return (
					<StepperItem key={step} step={step} className="not-last:flex-1">
						<StepperTrigger className="gap-4 rounded max-md:flex-col">
							<StepperIndicator asChild className={cn("w-full h-full")}>
								<div
									className={cn(
										buttonVariants({ variant: "default" }),
										"text-foreground bg-background hover:bg-background/80 focus:bg-background/80",
										"group-data-[state=completed]/step:text-green-700 group-data-[state=completed]/step:bg-green-100 group-data-[state=completed]/step:hover:bg-green-200 group-data-[state=completed]/step:focus:bg-green-200",
										"group-data-[state=active]/step:text-primary-foreground group-data-[state=active]/step:bg-primary group-data-[state=active]/step:hover:bg-primary/90 group-data-[state=active]/step:focus:bg-primary/90",
									)}
								>
									<Icon className="group-data-[state=completed]/step:hidden group-data-[state=active]/step:block hidden" />
									<CheckCircleIcon className="group-data-[state=completed]/step:block group-data-[state=active]/step:hidden hidden" />
									<CircleIcon className="group-data-[state=completed]/step:hidden group-data-[state=active]/step:hidden block" />
									{title}
								</div>
							</StepperIndicator>
						</StepperTrigger>
						{step < steps.length && (
							<StepperSeparator className="group-data-[state=completed]/step:bg-green-700 bg-gray-300 max-md:mt-3.5 md:mx-4" />
						)}
					</StepperItem>
				);
			})}
		</Stepper>
	);
}
