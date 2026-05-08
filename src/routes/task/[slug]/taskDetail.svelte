<script lang="ts">
	let { id, title, body, username, email, createdAt, status } = $props();
	import InputElement from '$lib/components/inputElement.svelte';
</script>

<form method="POST">
	<legend class="text-2xl"
		>Editing form
		<label for="title" class="block text-lg">Title:</label>
		<InputElement name="title" class="w-full" bind:value={title} />
		<label for="body" class="block">Body:</label>
		<textarea name="body" id="body" bind:value={body} class="w-full" rows="5" disabled></textarea>
		<button type="submit">Submit</button>
	</legend>
</form>
