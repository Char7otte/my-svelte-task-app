export type Task = {
	id: string;
	title: string;
	body: string;
	createdAt: Date;
	creatorID: string;
	status: string;
};

export type User = {
	id: string;
	email: string;
	passwordHash: string;
	username: string;
	role: string;
};

export type Session = {
	id: string;
	secretHash: Uint8Array;
	createdAt: Date;
	userID: string;
};

export interface SessionWithToken extends Session {
	token: string;
}

export interface TaskWithUser extends Task {
	username: string;
	email: string;
}
