"use client";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useGetMySessionQuery } from "@/shared/repositories/auth/query";
import { useState } from "react";
import ProfileForm from "../components/profile-form";
import ProfileHeading from "../components/profile-heading";
import ProfileInfo from "../components/profile-info";

export default function ProfileContainer() {
	const { data: res, isLoading } = useGetMySessionQuery();
	const [isEditing, setIsEditing] = useState(false);

	if (isLoading) {
		return <Skeleton className="h-96 w-full" />;
	}

	if (!res?.success) {
		return <div>Error fetching profile data</div>;
	}

	const user = res.data;

	return (
		<Card>
			<CardContent className="space-y-4">
				<ProfileHeading user={user} />
				{isEditing ? (
					<ProfileForm user={user} onCancel={() => setIsEditing(false)} />
				) : (
					<ProfileInfo user={user} onEdit={() => setIsEditing(true)} />
				)}
			</CardContent>
		</Card>
	);
}
