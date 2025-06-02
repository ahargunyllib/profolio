import {
	AwardIcon,
	BriefcaseIcon,
	FileCheckIcon,
	FileTextIcon,
	GraduationCapIcon,
	SettingsIcon,
	UserIcon,
} from "lucide-react";
import CVGrade from "../components/cv-review";
import EducationForm from "../components/forms/education-form";
import GeneralInfoForm from "../components/forms/general-info-form";
import PersonalInfoForm from "../components/forms/personal-info-form";
import SkillsForm from "../components/forms/skills-form";
import SummaryForm from "../components/forms/summary-form";
import WorkExperienceForm from "../components/forms/work-experience-form";

export const steps = [
	{
		step: 1,
		title: "General Info",
		icon: SettingsIcon,
		component: GeneralInfoForm,
	},
	{
		step: 2,
		title: "Personal Info",
		icon: UserIcon,
		component: PersonalInfoForm,
	},
	{
		step: 3,
		title: "Work Experience",
		icon: BriefcaseIcon,
		component: WorkExperienceForm,
	},
	{
		step: 4,
		title: "Education",
		icon: GraduationCapIcon,
		component: EducationForm,
	},
	{
		step: 5,
		title: "Skills",
		icon: AwardIcon,
		component: SkillsForm,
	},
	{
		step: 6,
		title: "Summary",
		icon: FileCheckIcon,
		component: SummaryForm,
	},
	{
		step: 7,
		title: "Grade",
		icon: FileTextIcon,
		component: CVGrade,
	},
];
