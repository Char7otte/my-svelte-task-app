<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import RequiredAsterisk from '$lib/requiredAsterisk.svelte';
	import { capitalize } from '$lib/utils/stringUtils';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	let disabled = $derived<boolean>(data.user === undefined);

	let titleInput: string = $state<string>('');
	let bodyInput: string = $state<string>('');

	function handleClearInputs() {
		titleInput = '';
		bodyInput = '';
	}
</script>

<div>
	{#if disabled}
		<h1 class="text-2xl">
			You need to <a href={resolve('/user')} class="text-blue-600 underline">sign in</a> to create tasks.
		</h1>
	{:else}
		<h1>Welcome, {data.user.username ? data.user.username : data.user.email}</h1>
	{/if}
</div>

{#if disabled}
	<div>
		<h1 class="text-2xl">
			You need to <a href={resolve('/user')} class="text-blue-600 underline">sign in</a> to create tasks.
		</h1>
	</div>
{/if}

<form method="POST" class="mb-10" use:enhance action="?/insert">
	<fieldset {disabled}>
		<h2 class="text-2xl">Create a task</h2>
		<label for="title" class="block">Title: <RequiredAsterisk /></label>
		<input type="text" name="title" id="title" bind:value={titleInput} required />
		<label for="body" class="block">Body:</label>
		<textarea name="body" id="body" bind:value={bodyInput} class="mb-3 block border-2 border-solid">
		</textarea>
		<button type="submit" class="primary">Submit</button>
		<button type="button" onclick={handleClearInputs} class="secondary">Clear</button>
	</fieldset>
</form>

<ul>
	{#if data.tasks.length === 0}
		<li>There are no tasks. Create one above!</li>
	{:else}
		{#each data.tasks as { id, title, body, createdAt, status, username, email } (id)}
			<li class="my-3">
				<div class="flex justify-between">
					<div>
						<h3 class="text-xl">{title}</h3>
						<p class="text-[12px] text-gray-600">{username ? username : email}</p>
					</div>
					<div class="flex flex-col items-end">
						<span>{capitalize(status)}</span>
						<span class="text-[10px] text-gray-600">{createdAt.toLocaleString()}</span>
					</div>
				</div>
				<p>{body}</p>
			</li>
			<hr />
		{/each}
	{/if}
</ul>
