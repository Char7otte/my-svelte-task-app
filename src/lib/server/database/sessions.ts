import type { Session } from '$lib/types';
import { error } from '@sveltejs/kit';
import { sql } from './psql';

export async function createSession(
	id: string,
	secretHash: Uint8Array,
	createdAt: Date,
	userID: string
): Promise<Session> {
	try {
		const dateInSeconds = Math.floor(createdAt.getTime() / 1000);
		const data: Session[] = await sql<Session[]>`
            INSERT INTO sessions (id, secret_hash, created_at, user_id) 
            VALUES (${id}, ${secretHash}, ${dateInSeconds}m ${userID}) 
            RETURNING id, secret_hash AS "secretHash", created_at AS "createdAt", user_id as "userID"`;
		return data[0];
	} catch (e) {
		console.error(e);
		error(500, { message: 'Failed to create session' });
	}
}

export async function getSessionByID(id: string): Promise<Session> {
	try {
		const data: Session[] = await sql<Session[]>`
            SELECT id, secret_hash AS "secretHash", created_at AS "createdAt", user_id as "userID 
            FROM sessions WHERE id = ${id}`;
		return data[0];
	} catch (e) {
		console.error(e);
		error(500, { message: 'Failed to create session' });
	}
}
