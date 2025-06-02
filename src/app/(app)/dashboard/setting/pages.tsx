"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { Switch } from "@/shared/components/ui/switch";
import {
	AlertTriangle,
	ArrowLeft,
	Calendar,
	CreditCard,
	Download,
	Eye,
	EyeOff,
	Key,
	MapPin,
	Shield,
	Smartphone,
	Trash2,
} from "lucide-react";
import Link from "next/link";

import { useState } from "react";

export default function AccountPage() {
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
	const [passwordData, setPasswordData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const handlePasswordChange = () => {
		console.log("Password change:", passwordData);
		setPasswordData({
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		});
	};

	const handleAccountDeletion = () => {
		console.log("Account deletion requested");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
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
					{/* Security Settings */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Shield className="w-5 h-5" />
								<span>Security</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Password Change */}
							<div>
								<h3 className="text-lg font-medium text-gray-900 mb-4">
									Change Password
								</h3>
								<div className="space-y-4 max-w-md">
									<div>
										<Label htmlFor="currentPassword">Current Password</Label>
										<div className="relative mt-1">
											<Input
												id="currentPassword"
												type={showCurrentPassword ? "text" : "password"}
												value={passwordData.currentPassword}
												onChange={(e) =>
													setPasswordData({
														...passwordData,
														currentPassword: e.target.value,
													})
												}
											/>
											<button
												type="button"
												onClick={() =>
													setShowCurrentPassword(!showCurrentPassword)
												}
												className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
											>
												{showCurrentPassword ? (
													<EyeOff className="w-4 h-4" />
												) : (
													<Eye className="w-4 h-4" />
												)}
											</button>
										</div>
									</div>

									<div>
										<Label htmlFor="newPassword">New Password</Label>
										<div className="relative mt-1">
											<Input
												id="newPassword"
												type={showNewPassword ? "text" : "password"}
												value={passwordData.newPassword}
												onChange={(e) =>
													setPasswordData({
														...passwordData,
														newPassword: e.target.value,
													})
												}
											/>
											<button
												type="button"
												onClick={() => setShowNewPassword(!showNewPassword)}
												className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
											>
												{showNewPassword ? (
													<EyeOff className="w-4 h-4" />
												) : (
													<Eye className="w-4 h-4" />
												)}
											</button>
										</div>
									</div>

									<div>
										<Label htmlFor="confirmPassword">
											Confirm New Password
										</Label>
										<Input
											id="confirmPassword"
											type="password"
											value={passwordData.confirmPassword}
											onChange={(e) =>
												setPasswordData({
													...passwordData,
													confirmPassword: e.target.value,
												})
											}
											className="mt-1"
										/>
									</div>

									<Button
										onClick={handlePasswordChange}
										className="bg-blue-600 hover:bg-blue-700 text-white"
									>
										<Key className="w-4 h-4 mr-2" />
										Update Password
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="space-y-6">
							{/* Account Deletion */}
							<div>
								<h3 className="text-lg font-medium text-red-600 mb-4">
									Delete Account
								</h3>
								<p className="text-sm text-gray-600 mb-4">
									Permanently delete your account and all associated data. This
									action cannot be undone.
								</p>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button variant="destructive">
											<Trash2 className="w-4 h-4 mr-2" />
											Delete Account
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle className="flex items-center space-x-2">
												<AlertTriangle className="w-5 h-5 text-red-600" />
												<span>Delete Account</span>
											</AlertDialogTitle>
											<AlertDialogDescription>
												Are you sure you want to delete your account? This will
												permanently remove all your CVs, personal data, and
												account information. This action cannot be undone.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={handleAccountDeletion}
												className="bg-red-600 hover:bg-red-700 text-white"
											>
												Yes, Delete Account
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
