import { getUserByEmailPassword, postUser } from '$lib/server/users.js';
import type { User } from '$lib/types.js';

export const actions = {
	signIn: async ({ request }) => {
		const data: FormData = await request.formData();
		const email: string = data.get('email') as string;
		const password: string = data.get('password') as string;
		const user: User | undefined = await getUserByEmailPassword(email, password);
		if (user) return true;
	},
	signUp: async ({ request }) => {
		const data: FormData = await request.formData();
		const email: string = data.get('email') as string;
		const password: string = data.get('password') as string;
		const name: string = data.get('name') as string;
		const user: User | undefined = await postUser(email, password, name);
		if (user) return true;
	}
};
