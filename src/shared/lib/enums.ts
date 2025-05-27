export const RoleEnum = {
	1: "User",
} as const;

export type RoleKey = keyof typeof RoleEnum;
export type RoleValue = (typeof RoleEnum)[RoleKey];

export const getRoleName = (roleKey: RoleKey): RoleValue | undefined => {
	return RoleEnum[roleKey];
};
