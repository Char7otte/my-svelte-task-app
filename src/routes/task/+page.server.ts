import { deleteTask, getTasks, insertTask } from '$lib/server/tasks';
import type { Task } from '$lib/types';

export async function load() {
	const tasks: Task[] = await getTasks();
	return {
		tasks
	};
}

export const actions = {
	insert: async ({ request }) => {
		const data: FormData = await request.formData();
		const title: string = data.get('title') as string;
		const body: string = data.get('body') as string;
		const newTask: Task = await insertTask(title, body);
		return { newTask };
	},
	delete: async ({ request }) => {
		const data: FormData = await request.formData();
		const id: string = data.get('id') as string;
		await deleteTask(id);
	}
};
