<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	let tasks = $derived(data.tasks);
	let title: string = $state<string>('');
	let body: string = $state<string>('');

	function handleClearInputs() {
		title = '';
		body = '';
	}
</script>

<div class="m-10">
	<form method="POST" class="mb-10" use:enhance action="?/insert">
		<h2>Create a task</h2>
		<label for="title">Title:</label>
		<input type="text" name="title" id="title" bind:value={title} />
		<label for="body">Body:</label>
		<input type="text" name="body" id="body" bind:value={body} />
		<button type="button" onclick={handleClearInputs}>Clear</button>
		<button type="submit">Submit</button>
	</form>

	<ul>
		{#if tasks.length === 0}
			<li>There are no tasks. Create one above!</li>
		{:else}
			{#each tasks as { id, title, body, createdAt } (id)}
				<li class="my-3">
					<h3>{title}</h3>
					<p>{body}</p>
					<p>{createdAt.toString()}</p>
					<form method="POST" action="?/delete">
						<input type="hidden" name="id" value={id} />
						<button type="submit">Delete</button>
					</form>
				</li>
				<hr />
			{/each}
		{/if}
	</ul>
</div>
