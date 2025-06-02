import ChangePasswordForm from "@/features/dashboard/dashboard-setting/components/change-password-form";
import DeleteAccountForm from "@/features/dashboard/dashboard-setting/components/delete-account-form";
import HeaderContainer from "@/features/dashboard/dashboard-setting/components/header-container";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { Shield } from "lucide-react";

export default function AccountPage() {
	return (
		<div className="min-h-dvh">
			<HeaderContainer />

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
						<Separator />
						<CardContent className="space-y-6">
							<ChangePasswordForm />
						</CardContent>
					</Card>
					<Card>
						<CardContent className="space-y-6">
							<DeleteAccountForm />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
