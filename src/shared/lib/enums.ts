export const RoleEnum = {
	1: "User",
} as const;

export type RoleKey = keyof typeof RoleEnum;
export type RoleValue = (typeof RoleEnum)[RoleKey];

export const getRoleName = (roleKey: RoleKey): RoleValue | undefined => {
	return RoleEnum[roleKey];
};

export const CVStatusEnum = {
	1: "Draft",
	2: "Needs Review",
	3: "Completed",
};

export type CVStatusKey = keyof typeof CVStatusEnum;
export type CVStatusValue = (typeof CVStatusEnum)[CVStatusKey];

export const getCVStatusValue = (
	cvStatusKey: CVStatusKey,
): CVStatusValue | undefined => {
	return CVStatusEnum[cvStatusKey];
};
