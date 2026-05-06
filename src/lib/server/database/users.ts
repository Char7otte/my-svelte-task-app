import type { User } from '$lib/types';
import { error } from '@sveltejs/kit';
import { sql } from './psql';

export async function getUserByEmail(email: string): Promise<User> {
	try {
		const user = await sql<
			User[]
		>`SELECT id, email, password_hash AS "passwordHash", username, role FROM users 
		WHERE email = ${email}`;
		return user[0];
	} catch (e) {
		console.error(e);
		error(500, { message: 'Failed to fetch user' });
	}
}

export async function postUser(email: string, password: string, username: string): Promise<User> {
	try {
		const user = await sql<User[]>`INSERT INTO users (email, password_hash, username) 
		VALUES(${email}, ${password}, ${username ? username : null}) 
		RETURNING id, email, password_hash AS "passwordHash", username`;
		return user[0];
	} catch (e) {
		console.error(e);
		error(500, { message: 'Failed to create user' });
	}
}
