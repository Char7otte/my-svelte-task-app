import type { Task, TaskWithUser } from '$lib/types';
import { error } from '@sveltejs/kit';
import { sql } from './psql';

// export async function getTasks(): Promise<Task[]> {
// 	try {
// 		const data = await sql<Task[]>`
// 			SELECT id, title, body, created_at AS "createdAt", creator_id as "creatorID", status
// 			FROM tasks
// 			ORDER BY created_at DESC`;
// 		return data;
// 	} catch (e) {
// 		console.error(e);
// 		error(500, { message: 'Failed to get tasks' });
// 	}
// }

export async function postTask(title: string, body: string, creatorID: string): Promise<Task> {
	try {
		const data = await sql<
			Task[]
		>`INSERT INTO tasks (title, body, creator_id) VALUES(${title}, ${body}, ${creatorID}) RETURNING id, title, body, created_at AS "createdAt"`;
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

export async function getTasksJoinUser(): Promise<TaskWithUser[]> {
	try {
		const data: TaskWithUser[] = await sql<TaskWithUser[]>`
	SELECT t.id, t.title, t.body, t.created_at AS "createdAt", u.id AS "creatorID", u.username, u.email, t.status
	FROM tasks t
	JOIN users u on t.creator_id = u.id
	ORDER BY created_at desc;
	 `;
		return data;
	} catch (e) {
		console.error(e);
		error(500, { message: 'Failed to get tasks' });
	}
}

export async function patchTask(id: string, title: string, body: string): Promise<Task> {
	try {
		const data: Task[] = await sql<Task[]>`
			UPDATE tasks 
			SET title = ${title}, body = ${body} 
			WHERE id = ${id}`;
		return data[0];
	} catch (e) {
		console.error(e);
		error(500, { message: 'Failed to edit task' });
	}
}

export async function getTaskByID(id: string): Promise<TaskWithUser> {
	try {
		const data = await sql<TaskWithUser[]>`
		SELECT * FROM tasks 
		WHERE id = ${id}`;
		return data[0];
	} catch (e) {
		console.error(e);
		error(500, { message: 'Faield to get task}' });
	}
}
