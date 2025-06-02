import HeaderContainer from "@/features/dashboard/dashboard-profile/components/header-container";
import ProfileContainer from "@/features/dashboard/dashboard-profile/containers/profile-container";

export default function ProfilePage() {
	return (
		<div className="min-h-dvh">
			<HeaderContainer />

			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold">Profile</h1>
					<p className="text-muted-foreground">
						Manage your personal information, contact details, and settings.
					</p>
				</div>

				<ProfileContainer />
			</div>
		</div>
	);
}
