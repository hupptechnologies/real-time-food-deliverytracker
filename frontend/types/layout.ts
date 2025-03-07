export type NavItem = {
	name: string;
	href: string;
	icon: React.ElementType;
};

export type NavItemWithChildren = NavItem & {
	children?: NavItem[];
};

export type ProfileMenuItemLink = {
	type: 'link';
	href: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
};

export type ProfileMenuItemAction = {
	type: 'action';
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	onClick: () => void;
};

export type ProfileMenuItem = ProfileMenuItemLink | ProfileMenuItemAction;
