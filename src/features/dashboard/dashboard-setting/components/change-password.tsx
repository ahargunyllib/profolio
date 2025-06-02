import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Eye, EyeOff, Key } from "lucide-react";
import { useState } from "react";
import type { PasswordData } from "../data/password-data";
import { initialPasswordData } from "../data/password-data";

interface ChangePasswordProps {
	onPasswordChange: (data: PasswordData) => void;
}

export default function ChangePassword({
	onPasswordChange,
}: ChangePasswordProps) {
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [passwordData, setPasswordData] =
		useState<PasswordData>(initialPasswordData);

	const handleChange = (field: keyof PasswordData, value: string) => {
		setPasswordData({ ...passwordData, [field]: value });
	};

	const handleSubmit = () => {
		onPasswordChange(passwordData);
		setPasswordData(initialPasswordData);
	};

	return (
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
							onChange={(e) => handleChange("currentPassword", e.target.value)}
						/>
						<button
							type="button"
							onClick={() => setShowCurrentPassword((v) => !v)}
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
							onChange={(e) => handleChange("newPassword", e.target.value)}
						/>
						<button
							type="button"
							onClick={() => setShowNewPassword((v) => !v)}
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
					<Label htmlFor="confirmPassword">Confirm New Password</Label>
					<Input
						id="confirmPassword"
						type="password"
						value={passwordData.confirmPassword}
						onChange={(e) => handleChange("confirmPassword", e.target.value)}
						className="mt-1"
					/>
				</div>
				<Button
					onClick={handleSubmit}
					className="bg-blue-600 hover:bg-blue-700 text-white"
				>
					<Key className="w-4 h-4 mr-2" />
					Update Password
				</Button>
			</div>
		</div>
	);
}
