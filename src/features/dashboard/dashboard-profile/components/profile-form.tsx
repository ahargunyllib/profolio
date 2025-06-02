"use client";

import type { ProfileData } from "../data/profile-type";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Save, X } from "lucide-react";

interface ProfileFormProps {
	editProfileData: ProfileData;
	setEditProfileData: (data: ProfileData) => void;
	onSave: () => void;
	onCancel: () => void;
}

export default function ProfileForm({
	editProfileData,
	setEditProfileData,
	onSave,
	onCancel,
}: ProfileFormProps) {
	return (
		<div className="space-y-6 border rounded-lg p-6 bg-white">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold text-gray-900">
					Edit Personal Information
				</h3>
				<div className="flex space-x-2">
					<Button
						onClick={onSave}
						className="px-4 py-2 rounded text-sm flex items-center"
					>
						<Save className="w-4 h-4 mr-2" />
						Save
					</Button>
					<Button
						onClick={onCancel}
						variant="outline"
						className="px-4 py-2 rounded text-sm flex items-center"
					>
						<X className="w-4 h-4 mr-2" />
						Cancel
					</Button>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<Label htmlFor="firstName">First Name</Label>
					<Input
						id="firstName"
						value={editProfileData.firstName}
						onChange={(e) =>
							setEditProfileData({
								...editProfileData,
								firstName: e.target.value,
							})
						}
						className="mt-1"
					/>
				</div>
				<div>
					<Label htmlFor="lastName">Last Name</Label>
					<Input
						id="lastName"
						value={editProfileData.lastName}
						onChange={(e) =>
							setEditProfileData({
								...editProfileData,
								lastName: e.target.value,
							})
						}
						className="mt-1"
					/>
				</div>
			</div>

			<div>
				<Label htmlFor="email">Email Address</Label>
				<Input
					id="email"
					type="email"
					value={editProfileData.email}
					onChange={(e) =>
						setEditProfileData({
							...editProfileData,
							email: e.target.value,
						})
					}
					className="mt-1"
				/>
			</div>

			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<Label htmlFor="phone">Phone Number</Label>
					<Input
						id="phone"
						value={editProfileData.phone}
						onChange={(e) =>
							setEditProfileData({
								...editProfileData,
								phone: e.target.value,
							})
						}
						className="mt-1"
					/>
				</div>
				<div>
					<Label htmlFor="location">Location</Label>
					<Input
						id="location"
						value={editProfileData.location}
						onChange={(e) =>
							setEditProfileData({
								...editProfileData,
								location: e.target.value,
							})
						}
						className="mt-1"
					/>
				</div>
			</div>

			<div>
				<Label htmlFor="website">Website/Portfolio</Label>
				<Input
					id="website"
					value={editProfileData.website}
					onChange={(e) =>
						setEditProfileData({
							...editProfileData,
							website: e.target.value,
						})
					}
					className="mt-1"
					placeholder="https://yourwebsite.com"
				/>
			</div>

			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<Label htmlFor="jobTitle">Current Job Title</Label>
					<Input
						id="jobTitle"
						value={editProfileData.jobTitle}
						onChange={(e) =>
							setEditProfileData({
								...editProfileData,
								jobTitle: e.target.value,
							})
						}
						className="mt-1"
					/>
				</div>
				<div>
					<Label htmlFor="company">Current Company</Label>
					<Input
						id="company"
						value={editProfileData.company}
						onChange={(e) =>
							setEditProfileData({
								...editProfileData,
								company: e.target.value,
							})
						}
						className="mt-1"
					/>
				</div>
			</div>

			<div>
				<Label htmlFor="bio">Bio</Label>
				<Textarea
					id="bio"
					value={editProfileData.bio}
					onChange={(e) =>
						setEditProfileData({
							...editProfileData,
							bio: e.target.value,
						})
					}
					className="mt-1"
					rows={3}
					placeholder="Tell us about yourself..."
				/>
			</div>
		</div>
	);
}
