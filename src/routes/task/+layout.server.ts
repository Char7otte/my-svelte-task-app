import { getTasksJoinUser } from '$lib/server/database/tasks';
import type { TaskWithUser, User } from '$lib/types';

export async function load({ locals }) {
	const tasks: TaskWithUser[] = await getTasksJoinUser();
	const user: User = locals.user;

	return {
		tasks,
		user
	};
}
