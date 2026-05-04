import type { Task } from '$lib/types';
import { error } from '@sveltejs/kit';
import { sql } from './psql';

export async function getTasks(): Promise<Task[]> {
	try {
		const data = await sql<Task[]>`SELECT id, title, body, created_at AS "createdAt" FROM tasks`;
		return data;
	} catch (e) {
		console.error(e);
		error(500, { message: 'Failed to get all tasks' });
	}
}

export async function insertTask(title: string, body: string): Promise<Task> {
	try {
		const data = await sql<
			Task[]
		>`INSERT INTO tasks (title, body) VALUES(${title}, ${body}) RETURNING id, title, body, created_at AS "createdAt"`;
		return data[0];
	} catch (e) {
		console.error(e);
		error(500, { message: 'Failed to insert task' });
	}
}

export async function deleteTask(id: string): Promise<void> {
	try {
		await sql`DELETE FROM tasks WHERE id = ${id}`;
	} catch (e) {
		console.error(e);
		error(500, { message: 'Failed to delete task' });
	}
}
