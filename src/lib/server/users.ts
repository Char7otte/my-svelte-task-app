import type { User } from '$lib/types';
import { error } from 'console';
import { sql } from './psql';

export async function getUserByEmailPassword(email: string, password: string) {
	try {
		const user = await sql<
			User[]
		>`SELECT * FROM users WHERE email = ${email} AND password = ${password}`;
		return user[0];
	} catch (e) {
		console.error(e);
		error(500, { message: 'Failed to fetch user' });
	}
}

export async function postUser(email: string, password: string, name: string) {
	try {
		const user = await sql<
			User[]
		>`INSERT INTO users (email, password, name) VALUES(${email}, ${password}, ${name}) RETURNING id, email, password, name`;
		return user[0];
	} catch (e) {
		console.error(e);
		error(500, { message: 'Failed to create user' });
	}
}
