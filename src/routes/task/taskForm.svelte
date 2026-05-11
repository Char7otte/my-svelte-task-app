<script lang="ts">
	import { enhance } from '$app/forms';
	import RequiredAsterisk from '$lib/components/requiredAsterisk.svelte';

    let { disabled } = $props();

	let titleInput: string = $state<string>('');
	let bodyInput: string = $state<string>('');

	function handleClearInputs() {
		titleInput = '';
		bodyInput = '';
	}
</script>

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

