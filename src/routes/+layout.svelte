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

<div class="m-10">
	{@render children()}
</div>
