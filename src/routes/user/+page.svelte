<script lang="ts">
	import { enhance } from '$app/forms';

	let isSignIn = $state<boolean>(false);
</script>

<form method={isSignIn ? 'GET' : 'POST'} use:enhance action={`?/${isSignIn ? 'signIn' : 'signUp'}`}>
	<label for="email">Email:</label>
	<input type="email" name="email" id="email" required />
	{#if !isSignIn}
		<label for="name">Name:</label>
		<input type="text" name="name" id="name" required />
	{/if}
	<label for="password">Password:</label>
	<input type="password" name="password" id="password" required />
	<button type="submit">{isSignIn ? 'Sign in' : 'Sign up'}</button>
</form>
