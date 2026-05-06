import { deleteTask, getTasksJoinUser, postTask } from '$lib/server/database/tasks.js';
import type { TaskWithUser } from '$lib/types';

export async function load({ locals }) {
	const tasks: TaskWithUser[] = await getTasksJoinUser();

	return {
		tasks,
		user: locals.user
	};
}

export const actions = {
	insert: async ({ request, locals }) => {
		const data: FormData = await request.formData();
		const userID = locals.user.id;
		const title: string = data.get('title') as string;
		const body: string = data.get('body') as string;
		await postTask(title, body, userID);
	},
	delete: async ({ request }) => {
		const data: FormData = await request.formData();
		const id: string = data.get('id') as string;
		await deleteTask(id);
	}
};
