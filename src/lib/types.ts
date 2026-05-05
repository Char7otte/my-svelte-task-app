export type Task = {
	id: string;
	title: string;
	body: string;
	createdAt: Date;
	creatorID: string;
};

export type User = {
	id: string;
	email: string;
	passwordHash: string;
	name: string;
};
