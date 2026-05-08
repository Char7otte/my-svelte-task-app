import { deleteTask, postTask } from '$lib/server/database/tasks.js';

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
