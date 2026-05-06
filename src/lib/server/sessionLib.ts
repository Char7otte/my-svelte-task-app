import { generateSecureRandomString, hashSecret } from '$lib/hashUtils';
import type { SessionWithToken } from '$lib/types';

async function createSession(userID: string): Promise<SessionWithToken> {
	const now = new Date();

	const id = generateSecureRandomString();
	const secret = generateSecureRandomString();
	const secretHash = await hashSecret(secret);

	const token = id + '.' + secret;

	const session: SessionWithToken = {
		id,
		secretHash,
		createdAt: now,
		userID,
		token
	};

	await postSession();

	return session;
}
