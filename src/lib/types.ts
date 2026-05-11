export type Status = "not started" | "working" |"completed"
export type Role = "user" | "admin"

export type Task = {
	id: string;
	title: string;
	body: string;
	createdAt: Date;
	creatorID: string;
	status: Status
};

export type User = {
	id: string;
	email: string;
	passwordHash: string;
	username: string;
	role: Role
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
