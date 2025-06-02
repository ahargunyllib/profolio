import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import type { CVData } from "@/shared/repositories/cvs/dto";
import { Download, RefreshCw } from "lucide-react";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function CVEditorPreview() {
	const form = useFormContext<CVData>();
	const [
		firstName,
		lastName,
		jobName,
		email,
		phoneNumber,
		location,
		website,
		linkedinProfile,
		jobExperiences,
		educations,
		skills,
		summary,
	] = form.watch([
		"data.firstName",
		"data.lastName",
		"jobName",
		"data.email",
		"data.phoneNumber",
		"data.location",
		"data.website",
		"data.linkedinProfile",
		"data.jobExperiences",
		"data.educations",
		"data.skills",
		"data.summary",
	]);

	const [isPrinting, setIsPrinting] = useState(false);
	const cvRef = useRef<HTMLDivElement>(null);

	// Custom PDF export function that uses browser's native print functionality
	const handlePrint = () => {
		setIsPrinting(true);

		// Add a small delay to allow the UI to update
		setTimeout(() => {
			// Store the current page title
			const originalTitle = document.title;

			// Set a custom title for the PDF
			document.title = `${firstName}-${lastName}-${jobName}_CV`;

			// Print the document
			window.print();

			// Restore the original title
			document.title = originalTitle;

			setIsPrinting(false);
		}, 300);
	};

	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>CV Preview</CardTitle>
					<CardDescription>
						This is a preview of your CV. Please ensure all information is
						correct before submitting.
					</CardDescription>
					<CardAction>
						<Button onClick={handlePrint} disabled={isPrinting}>
							{isPrinting ? (
								<>
									<RefreshCw className="w-4 h-4 animate-spin" />
									Generating...
								</>
							) : (
								<>
									<Download className="w-4 h-4" />
									Export PDF
								</>
							)}
						</Button>
					</CardAction>
				</CardHeader>
				<CardContent>
					<Card>
						<CardContent
							className="font-lusitana space-y-4"
							ref={cvRef}
							id="cv-print-container"
						>
							<div className="space-y-0">
								<h2 className="text-4xl text-center">
									{firstName} {lastName}
								</h2>
								<h3 className="text-md text-muted-foreground text-center">
									{jobName}
								</h3>
								<div className="flex flex-row gap-2 justify-evenly items-center">
									<span className="text-xs text-muted-foreground text-center">
										{email}
									</span>
									{phoneNumber && (
										<span className="text-xs text-muted-foreground text-center">
											{phoneNumber}
										</span>
									)}
									{location && (
										<span className="text-xs text-muted-foreground text-center">
											{location}
										</span>
									)}
									{linkedinProfile && (
										<span className="text-xs text-muted-foreground text-center">
											{linkedinProfile}
										</span>
									)}
									{website && (
										<span className="text-xs text-muted-foreground text-center">
											{website}
										</span>
									)}
								</div>
							</div>
							{summary !== "" && (
								<div>
									<h4 className="text-xl">Summary</h4>
									<Separator className="mb-2" />
									<p className="text-xs text-muted-foreground">{summary}</p>
								</div>
							)}
							{jobExperiences.length > 0 && (
								<div>
									<h4 className="text-xl">Experience</h4>
									<Separator className="mb-2" />
									{jobExperiences.map((jobExperience, idx) => {
										return (
											<div
												className=""
												key={`${jobExperience.jobTitle}-${idx}`}
											>
												<div className="flex flex-row justify-between items-center text-sm">
													<h5 className="">
														{jobExperience.company} ({jobExperience.jobTitle})
													</h5>
													<h6>
														{Intl.DateTimeFormat("en-US", {
															month: "short",
															year: "numeric",
														}).format(new Date(jobExperience.startDate))}{" "}
														-{" "}
														{jobExperience.endDate
															? Intl.DateTimeFormat("en-US", {
																	month: "short",
																	year: "numeric",
																}).format(new Date(jobExperience.endDate))
															: "Now"}{" "}
														{jobExperience.location
															? `(${jobExperience.location})`
															: ""}
													</h6>
												</div>
												{jobExperience.description && (
													<p className="text-xs text-muted-foreground">
														{jobExperience.description}
													</p>
												)}
												<ul className="list-disc list-inside text-xs ml-4">
													{jobExperience.points.map(({ point }) => {
														return <li key={point}>{point}</li>;
													})}
												</ul>
											</div>
										);
									})}
								</div>
							)}
							{educations.length > 0 && (
								<div>
									<h4 className="text-xl">Education</h4>
									<Separator className="mb-2" />
									{educations.map((education, idx) => {
										return (
											<div className="" key={`${education.institution}-${idx}`}>
												<div className="flex flex-row justify-between items-center text-sm">
													<h5>{education.institution}</h5>
													<h6>
														{Intl.DateTimeFormat("en-US", {
															month: "short",
															year: "numeric",
														}).format(new Date(education.startDate))}{" "}
														-{" "}
														{education.endDate
															? Intl.DateTimeFormat("en-US", {
																	month: "short",
																	year: "numeric",
																}).format(new Date(education.endDate))
															: "Now"}{" "}
														{education.location
															? `(${education.location})`
															: ""}
													</h6>
												</div>
												<p className="text-xs text-muted-foreground">
													{education.degree} in {education.fieldOfStudy}{" "}
													{education.gpa ? `(${education.gpa})` : ""}
												</p>
											</div>
										);
									})}
								</div>
							)}
							{skills && skills.length > 0 && (
								<div>
									<h4 className="text-xl">Skill</h4>
									<Separator className="mb-2" />
									<span className="text-xs text-muted-foreground">
										{skills.map((skill) => skill.name).join(", ")}
									</span>
								</div>
							)}
						</CardContent>
					</Card>
				</CardContent>
			</Card>

			{/* Print-specific styles */}
			<style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #cv-print-container,
          #cv-print-container * {
            visibility: visible;
          }
          #cv-print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            margin: 0;
          }
          @page {
            size: A4;
            margin: 0.5in;
          }
        }
      `}</style>
		</div>
	);
}
