"use client";

import { Button } from "@/shared/components/ui/button";
import type { User } from "@/shared/types";
import { Edit, Globe, Mail, MapPin, Phone } from "lucide-react";

type Props = {
	user: User;
	onEdit: () => void;
};

export default function ProfileInfo({ user, onEdit }: Props) {
	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-start">
					<h3 className="text-lg font-semibold text-gray-900">
						Contact Information
					</h3>
					<Button
						onClick={() => onEdit()}
						className="px-3 py-1 rounded flex items-center text-sm"
					>
						<Edit className="w-4 h-4 mr-1" />
						Edit
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
							<Mail className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<p className="text-sm text-gray-500">Email</p>
							<p className="font-medium">{user.email}</p>
						</div>
					</div>

					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
							<Phone className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<p className="text-sm text-gray-500">Phone</p>
							<p className="font-medium">{user.phoneNumber ?? "-"}</p>
						</div>
					</div>

					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
							<MapPin className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<p className="text-sm text-gray-500">Location</p>
							<p className="font-medium">{user.location ?? "-"}</p>
						</div>
					</div>

					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
							<Globe className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<p className="text-sm text-gray-500">Website</p>
							{user.website ? (
								<a
									href={user.website}
									className="font-medium text-blue-600 hover:underline"
								>
									{user.website.replace(/(^\w+:|^)\/\//, "")}
								</a>
							) : (
								<p className="font-medium text-gray-500">-</p>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="mt-8">
				<h4 className="text-sm text-gray-500 mb-2">About Me</h4>
				<p className="text-gray-700 leading-relaxed">{user.bio || "-"}</p>
			</div>
		</>
	);
}
