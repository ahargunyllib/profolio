"use client";

import ChangePassword from "@/features/dashboard/dashboard-setting/components/change-password";
import DeleteAccount from "@/features/dashboard/dashboard-setting/components/delete-account";
import type { PasswordData } from "@/features/dashboard/dashboard-setting/data/password-data";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
	const handlePasswordChange = (data: PasswordData) => {
		console.log("Password change:", data);
	};

	const handleAccountDeletion = () => {
		console.log("Account deletion requested");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white border-b border-gray-200">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Account Settings
					</h1>
					<p className="text-gray-600">
						Manage your account security, billing, and data.
					</p>
				</div>

				<div className="space-y-8">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Shield className="w-5 h-5" />
								<span>Security</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<ChangePassword onPasswordChange={handlePasswordChange} />
						</CardContent>
					</Card>
					<Card>
						<CardContent className="space-y-6">
							<DeleteAccount onDelete={handleAccountDeletion} />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
