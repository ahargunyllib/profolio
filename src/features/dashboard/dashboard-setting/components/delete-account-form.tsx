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
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { useDeleteMyAccountMutation } from "@/shared/repositories/auth/query";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteAccountForm() {
	const { mutate: deleteMyAccount, isPending } = useDeleteMyAccountMutation();
	const router = useRouter();

	const onDelete = () => {
		deleteMyAccount(undefined, {
			onSuccess: (res) => {
				if (!res.success) {
					toast.error(res.message);
					return;
				}

				toast.success(res.message);
				router.replace("/");
			},
		});
	};

	return (
		<div>
			<h3 className="text-lg font-medium text-red-600 mb-4">Delete Account</h3>
			<p className="text-sm text-gray-600 mb-4">
				Permanently delete your account and all associated data. This action
				cannot be undone.
			</p>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="destructive">
						<Trash2 />
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
							permanently remove all your CVs, personal data, and account
							information. This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={onDelete}
							disabled={isPending}
							className={buttonVariants({ variant: "destructive" })}
						>
							Yes, Delete Account
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
