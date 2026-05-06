<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import RequiredAsterisk from '$lib/requiredAsterisk.svelte';
	import type { TaskWithUser } from '$lib/types';
	import type { PageData } from './$types';
	import Task from './task.svelte';

	const { data }: { data: PageData } = $props();
	let disabled = $derived<boolean>(data.user === undefined);

	let titleInput: string = $state<string>('');
	let bodyInput: string = $state<string>('');

	function handleClearInputs() {
		titleInput = '';
		bodyInput = '';
	}

	let viewOption: string = $state<'all' | 'mine'>('all');
	let taskList: TaskWithUser[] = $derived.by(() => {
		if (viewOption === 'mine') return data.tasks.filter((t) => t.creatorID === data.user.id);
		return data.tasks;
	});
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
		<input type="text" name="title" id="title" bind:value={titleInput} required class="w-full" />

		<label for="body" class="block">Body:</label>
		<textarea name="body" id="body" bind:value={bodyInput} class="mb-3 w-full" rows="5"> </textarea>

		<button type="submit" class="primary">Submit</button>
		<button type="button" onclick={handleClearInputs} class="secondary">Clear</button>
	</fieldset>
</form>

<h2 class="text-2xl">
	<input
		type="radio"
		id="view-all"
		class="sr-only"
		value="all"
		name="view-option"
		bind:group={viewOption}
	/>
	<label for="view-all">All tasks</label>
	<input
		type="radio"
		id="view-mine"
		class="sr-only"
		value="mine"
		name="view-option"
		bind:group={viewOption}
	/>
	<label for="view-mine">My tasks</label>
</h2>
<ul>
	{#if data.tasks.length === 0}
		<li>There are no tasks. Create one above!</li>
	{:else}
		{#each taskList as task (task.id)}
			<Task {...task} />
		{/each}
	{/if}
</ul>
