import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { type CVData, schema } from "@/shared/repositories/cvs/dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CVEditorPreview from "../components/cv-editor-preview";
import CVEditorStepper from "../components/cv-editor-stepper";
import { steps } from "../data/steps";

export default function CVEditorContainer() {
	const [currentStep, setCurrentStep] = useState(1);
	const Comp = steps[currentStep - 1].component;

	const form = useForm<CVData>({
		resolver: zodResolver(schema),
		defaultValues: {
			jobName: "",
			description: "",
			data: {
				firstName: "",
				lastName: "",
				email: "",
				phoneNumber: "",
				location: "",
				website: "",
				linkedinProfile: "",
				summary: "",
				jobExperiences: [],
				educations: [],
				skills: [],
			},
		},
	});

	return (
		<>
			<CVEditorStepper
				currentStep={currentStep}
				setCurrentStep={setCurrentStep}
			/>
			<Form {...form}>
				<div className="grid grid-cols-2 gap-8">
					<div className="flex flex-col gap-4">
						<Comp />

						<div className="flex flex-row items-center justify-between">
							<Button
								onClick={() => {
									if (currentStep > 1) {
										setCurrentStep(currentStep - 1);
									}
								}}
								disabled={currentStep === 1}
							>
								<ArrowLeftIcon />
								Previous
							</Button>
							<span>
								Step {currentStep} of {steps.length}
							</span>
							<Button
								onClick={() => {
									if (currentStep < steps.length) {
										setCurrentStep(currentStep + 1);
									}
								}}
								disabled={currentStep === steps.length}
							>
								Next
								<ArrowRightIcon />
							</Button>
						</div>
					</div>
					<CVEditorPreview />
				</div>
			</Form>
		</>
	);
}
