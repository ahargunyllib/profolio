"use client";

import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import {
	CreateCVSchema,
	type TCreateCVRequest,
} from "@/shared/repositories/cvs/dto";
import {
	useCreateCVMutation,
	useUpdateCVMutation,
} from "@/shared/repositories/cvs/query";
import type { CV } from "@/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CVEditorPreview from "../components/cv-editor-preview";
import CVEditorStepper from "../components/cv-editor-stepper";
import { steps } from "../data/steps";

type Props = {
	cv?: CV;
};

export default function CVEditorContainer({ cv }: Props) {
	const [currentStep, setCurrentStep] = useState(1);
	const Comp = steps[currentStep - 1].component;

	const form = useForm<TCreateCVRequest>({
		resolver: zodResolver(CreateCVSchema),
		defaultValues: {
			jobName: cv?.jobName || "",
			description: cv?.description || "",
			data: {
				firstName: cv?.data.firstName || "",
				lastName: cv?.data.lastName || "",
				email: cv?.data.email || "",
				phoneNumber: cv?.data.phoneNumber || "",
				location: cv?.data.location || "",
				website: cv?.data.website || "",
				linkedinProfile: cv?.data.linkedinProfile || "",
				summary: cv?.data.summary || "",
				jobExperiences: cv?.data.jobExperiences || [],
				educations: cv?.data.educations || [],
				skills: cv?.data.skills || [],
			},
		},
	});

	const { mutate: createCV, isPending: isCreatingCV } = useCreateCVMutation();
	const { mutate: updateCV, isPending: isUpdatingCV } = useUpdateCVMutation(
		cv?.id || "",
	);
	const router = useRouter();

	const onSubmitHandler = form.handleSubmit((data) => {
		if (cv) {
			const req = {
				id: cv.id,
				...data,
			};
			updateCV(req, {
				onSuccess(res) {
					if (!res.success) {
						toast.error(res.message);
						return;
					}

					toast.success(res.message);
					form.reset();

					router.push("/dashboard");
				},
			});
			return;
		}

		createCV(data, {
			onSuccess(res) {
				if (!res.success) {
					toast.error(res.message);
					return;
				}

				toast.success(res.message);
				form.reset();

				router.push("/dashboard");
			},
		});
	});

	return (
		<>
			<CVEditorStepper
				currentStep={currentStep}
				setCurrentStep={setCurrentStep}
			/>
			<Form {...form}>
				<form onSubmit={onSubmitHandler} className="grid grid-cols-2 gap-8">
					<div className="flex flex-col gap-4">
						<Comp />

						<div className="flex flex-row items-center justify-between">
							<Button
								type="button"
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
							{currentStep < steps.length ? (
								<Button
									type="button"
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
							) : (
								<Button type="submit" disabled={isCreatingCV || isUpdatingCV}>
									{cv
										? isUpdatingCV
											? "Updating CV..."
											: "Update CV"
										: isCreatingCV
											? "Creating CV..."
											: "Create CV"}
								</Button>
							)}
						</div>
					</div>
					<CVEditorPreview />
				</form>
			</Form>
		</>
	);
}
