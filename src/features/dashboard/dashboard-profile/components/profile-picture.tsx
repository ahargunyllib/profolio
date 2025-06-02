"use client";
import { Camera } from "lucide-react";
import Image from "next/image";
import type { RefObject } from "react";

interface ProfilePictureProps {
	profilePicture: string;
	onClick: () => void;
	fileInputRef: RefObject<HTMLInputElement | null>;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	firstName: string;
	lastName: string;
	jobTitle: string;
	company: string;
}

export default function ProfilePicture({
	profilePicture,
	onClick,
	fileInputRef,
	onChange,
	firstName,
	lastName,
	jobTitle,
	company,
}: ProfilePictureProps) {
	return (
		<div className="flex flex-col items-center mb-8">
			<div className="relative group w-32 h-32">
				<Image
					src={profilePicture}
					alt="Profile"
					width={128}
					height={128}
					className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg cursor-pointer"
					onClick={onClick}
				/>
				<div
					className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
					onClick={onClick}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") onClick();
					}}
					aria-label="Change profile picture"
				>
					<Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
				</div>
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					style={{ display: "none" }}
					onChange={onChange}
				/>
			</div>
			<div className="mt-4 text-center">
				<p className="text-2xl font-bold text-gray-900">
					{firstName} {lastName}
				</p>
				<p className="text-blue-600 font-medium">{jobTitle}</p>
				<p className="text-gray-600">{company}</p>
			</div>
		</div>
	);
}
