<script lang="ts">
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.ico';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head
	><link rel="icon" href={favicon} />
	<title>webi wabo</title>
</svelte:head>

<nav class="space-x-5 bg-black p-4">
	<a href={resolve('/')} class="text-xl text-white">Home</a>
	<a href={resolve('/task')} class="text-xl text-white">Tasks</a>
	<a href={resolve('/user')} class="text-xl text-white">Account</a>
</nav>

<div class="mx-auto my-2 max-w-187.5">
	<div class="p-4">{@render children()}</div>
</div>

<footer class="bg-black text-center text-white">
	<div class="mx-auto w-56.25 py-10">
		Created by Shar with Sveltekit<br />
		be gay and do estrogen <br />
		<a href="https://github.com/Char7otte/my-svelte-task-app" class="underline">Source</a>
	</div>
</footer>
