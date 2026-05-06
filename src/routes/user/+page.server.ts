import { postUser } from '$lib/server/database/users';
import { createSession } from '$lib/server/sessionLib';
import type { User } from '$lib/types.js';
import bcrypt from 'bcrypt';
import { error } from 'console';

export const actions = {
	default: async ({ request }) => {
		const data: FormData = await request.formData();
		const email: string = data.get('email') as string;
		const password: string = data.get('password') as string;
		const passwordHash: string = await bcrypt.hash(password, 10);

		const option: string = data.get('option') as string;

		if (option === 'sign in') {
			// const user = await getUserByEmail(email);
			// const isCorrect = await bcrypt.compare(password, user.passwordHash);
		} else if (option === 'sign up') {
			const username = data.get('username') as string;
			const user: User = await postUser(email, passwordHash, username);
			const session = await createSession(user.id);
			console.log('Created Session: ', session);
		} else {
			error('403', { message: "smh don't modify the form options" });
		}
	}
};
