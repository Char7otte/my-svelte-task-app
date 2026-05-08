import { getTasksJoinUser } from '$lib/server/database/tasks';
import type { TaskWithUser } from '$lib/types';

export async function load({ locals }) {
	const tasks: TaskWithUser[] = await getTasksJoinUser();

	return {
		tasks,
		user: locals.user
	};
}
