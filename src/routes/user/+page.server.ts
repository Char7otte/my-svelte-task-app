import { getUserByEmail, postUser } from '$lib/server/database/users';
import { createSession } from '$lib/sessionLib.js';
import type { User } from '$lib/types.js';
import { comparePasswordHash } from '$lib/utils/hashUtils';
import { error, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export async function load({ locals }) {
	return {
		user: locals.user
	};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data: FormData = await request.formData();

		const email: string = data.get('email') as string;
		const password: string = data.get('password') as string;
		const option: string = data.get('option') as string;

		if (option === 'sign in') {
			const user: User = await getUserByEmail(email);
			if (!user) error(404, { message: 'Incorrect credentials' });
			const isSamePassword = await comparePasswordHash(password, user.passwordHash);
			if (!isSamePassword) error(404, { message: 'Incorrect credentials' });
			const session = await createSession(user.id);
			cookies.set('token', session.token, { path: '/' });
			throw redirect(303, '/task');
		} else if (option === 'sign up') {
			const username = data.get('username') as string;
			const passwordHash: string = await bcrypt.hash(password, 10);
			const user: User = await postUser(email, passwordHash, username);
			const session = await createSession(user.id);
			cookies.set('token', session.token, { path: '/' });
			throw redirect(303, '/task');
		} else {
			error(403, { message: "smh don't modify the form options" });
		}
	}
};
