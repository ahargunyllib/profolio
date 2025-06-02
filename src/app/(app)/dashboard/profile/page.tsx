"use client";

import ProfileForm from "@/features/dashboard/dashboard-profile/components/profile-form";
import ProfileInfo from "@/features/dashboard/dashboard-profile/components/profile-info";
import ProfilePicture from "@/features/dashboard/dashboard-profile/components/profile-picture";
import { initialProfileData } from "@/features/dashboard/dashboard-profile/data/profile-data";
import type { ProfileData } from "@/features/dashboard/dashboard-profile/data/profile-type";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export default function ProfilePage() {
	const [editingSection, setEditingSection] = useState<string | null>(null);
	const [profileData, setProfileData] =
		useState<ProfileData>(initialProfileData);
	const [editProfileData, setEditProfileData] =
		useState<ProfileData>(profileData);
	const [profilePicture, setProfilePicture] =
		useState<string>("/placeholder.svg");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleEdit = (section: string) => {
		setEditingSection(section);
		if (section === "personal") setEditProfileData(profileData);
	};

	const saveSection = (section: string) => {
		if (section === "personal") setProfileData(editProfileData);
		setEditingSection(null);
	};

	const cancelEdit = () => setEditingSection(null);

	const handleProfilePictureClick = () => {
		fileInputRef.current?.click();
	};

	const handleProfilePictureChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setProfilePicture(url);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white border-b border-gray-200">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between py-6">
						<div className="flex items-center space-x-4">
							<Link
								href="/dashboard"
								className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
							>
								<ArrowLeft className="w-5 h-5" />
								<span>Back to Dashboard</span>
							</Link>
						</div>
					</div>
				</div>
			</header>

			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Card className="border-0 shadow-lg">
					<CardContent className="p-8 bg-white">
						<ProfilePicture
							profilePicture={profilePicture}
							onClick={handleProfilePictureClick}
							fileInputRef={fileInputRef}
							onChange={handleProfilePictureChange}
							firstName={profileData.firstName}
							lastName={profileData.lastName}
							jobTitle={profileData.jobTitle}
							company={profileData.company}
						/>
						{editingSection === "personal" ? (
							<ProfileForm
								editProfileData={editProfileData}
								setEditProfileData={setEditProfileData}
								onSave={() => saveSection("personal")}
								onCancel={cancelEdit}
							/>
						) : (
							<ProfileInfo
								profileData={profileData}
								onEdit={() => handleEdit("personal")}
							/>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
