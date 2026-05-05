<script lang="ts">
	import { enhance } from '$app/forms';
	import RequiredAsterisk from '$lib/requiredAsterisk.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	let titleInput: string = $state<string>('');
	let bodyInput: string = $state<string>('');

	function handleClearInputs() {
		titleInput = '';
		bodyInput = '';
	}
</script>

<form method="POST" class="mb-10" use:enhance action="?/insert">
	<h1 class="text-2xl">Create a task</h1>
	<label for="title" class="block">Title: <RequiredAsterisk /></label>
	<input type="text" name="title" id="title" bind:value={titleInput} required />
	<label for="body" class="block">Body: <RequiredAsterisk /></label>
	<textarea
		name="body"
		id="body"
		bind:value={bodyInput}
		class="mb-3 block border-2 border-solid"
		required
	>
	</textarea>
	<button type="submit">Submit</button>
	<button type="button" onclick={handleClearInputs}>Clear</button>
</form>

<ul>
	{#if data.tasks.length === 0}
		<li>There are no tasks. Create one above!</li>
	{:else}
		{#each data.tasks as { id, title, body, createdAt } (id)}
			<li class="my-3">
				<h3>{title}</h3>
				<p>{body}</p>
				<p>{createdAt.toString()}</p>
				<form method="POST" action="?/delete" use:enhance>
					<input type="hidden" name="id" value={id} />
					<button type="submit">Delete</button>
				</form>
			</li>
			<hr />
		{/each}
	{/if}
</ul>
