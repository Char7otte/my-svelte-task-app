export type Task = {
	id: string;
	title: string;
	body: string;
	createdAt: Date;
};

export type User = {
	id: string;
	email: string;
	password: string;
	name: string;
};
