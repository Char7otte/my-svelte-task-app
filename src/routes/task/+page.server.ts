import { deleteTask, getTasksJoinUser, postTask } from '$lib/server/database/tasks.js';
import type { Task } from '$lib/types';

export async function load(event) {
	const tasks: Task[] = await getTasks();

	return {
		tasks,
		user: event.locals.user
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
