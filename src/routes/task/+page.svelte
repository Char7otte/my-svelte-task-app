<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	let titleInput: string = $state<string>('');
	let bodyInput: string = $state<string>('');

	function handleClearInputs() {
		titleInput = '';
		bodyInput = '';
	}
</script>

<div class="m-10">
	<form method="POST" class="mb-10" use:enhance action="?/insert">
		<h2>Create a task</h2>
		<label for="title">Title:</label>
		<input type="text" name="title" id="title" bind:value={titleInput} />
		<label for="body">Body:</label>
		<input type="text" name="body" id="body" bind:value={bodyInput} />
		<button type="button" onclick={handleClearInputs}>Clear</button>
		<button type="submit">Submit</button>
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
</div>
