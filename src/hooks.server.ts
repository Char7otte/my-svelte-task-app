import { getUserByID } from '$lib/server/database/users';
import { validateSessionToken } from '$lib/sessionLib';

export async function handle({ event, resolve }) {
	const token = event.cookies.get('token');
	if (token) {
		const session = await validateSessionToken(token);
		if (session) {
			event.locals.user = await getUserByID(session.userID);
			event.locals.session = session;
		}
	}

	const response = await resolve(event);
	return response;
}
