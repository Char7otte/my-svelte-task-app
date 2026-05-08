<script lang="ts">
	import { enhance } from '$app/forms';
	import RequiredAsterisk from '$lib/components/requiredAsterisk.svelte';

	let signOption: string = $state<'sign in' | 'sign up'>('sign in');
	let isSignIn: boolean = $derived<boolean>(signOption === 'sign in');
</script>

<form method="POST" use:enhance>
	<h1 class="text-2xl">
		{isSignIn ? 'Sign In' : 'Sign Up'}
	</h1>
	<input
		type="radio"
		id="sign-in"
		class="sr-only"
		bind:group={signOption}
		value="sign in"
		name="sign-option"
	/>
	<label for="sign-in" class={isSignIn ? 'underline' : ''}>Sign in</label>
	<input
		type="radio"
		id="sign-up"
		class="sr-only"
		bind:group={signOption}
		value="sign up"
		name="sign-option"
	/>
	<label for="sign-up" class={!isSignIn ? 'underline' : ''}>Sign up</label>
	<label for="email" class="block">Email: <RequiredAsterisk /> </label>
	<input type="email" name="email" id="email" required />
	{#if !isSignIn}
		<label for="username" class="block">Username: </label>
		<input type="text" name="username" id="username" />
	{/if}
	<label for="password" class="block">Password: <RequiredAsterisk /></label>
	<input type="password" name="password" id="password" required minlength="8" />
	<button type="submit">{isSignIn ? 'Sign in' : 'Sign up'}</button>
</form>
