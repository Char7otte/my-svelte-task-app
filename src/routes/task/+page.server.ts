import { deleteTask, getTasks, postTask } from '$lib/server/database/tasks.js';
import { getUserByID } from '$lib/server/database/users';
import { validateSessionToken } from '$lib/sessionLib.js';
import type { Task } from '$lib/types';

export async function load({ cookies }) {
	const tasks: Task[] = await getTasks();

	const token = cookies.get('token');
	if (!token) return { tasks, user: null };

	const session = await validateSessionToken(token);
	if (!session) return { tasks, user: null };

	const user = await getUserByID(session.userID);

	return {
		tasks,
		user
	};
}

export const actions = {
	insert: async ({ request }) => {
		const data: FormData = await request.formData();
		const title: string = data.get('title') as string;
		const body: string = data.get('body') as string;
		const newTask: Task = await postTask(title, body);
		return { newTask };
	},
	delete: async ({ request }) => {
		const data: FormData = await request.formData();
		const id: string = data.get('id') as string;
		await deleteTask(id);
	}
};
