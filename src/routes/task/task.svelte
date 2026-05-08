<script lang="ts">
	import { resolve } from '$app/paths';
	import { slide } from 'svelte/transition';
	import StatusIndicator from './statusIndicator.svelte';
	let { id, title, body, username, email, createdAt, status } = $props();

	const resolved = $derived(resolve('/task/[slug]', { slug: id }));
</script>

<li class="my-3 cursor-pointer p-4 hover:shadow-lg" transition:slide>
	<a href={resolved}>
		<div class="flex justify-between">
			<div>
				<h3 class="text-xl"><StatusIndicator {status} /> {title}</h3>
				<p class="text-[12px] text-gray-600">{username ? username : email} text-shadow-lg</p>
			</div>
			<span class="mt-1 text-[10px] text-gray-600">{createdAt.toLocaleString()}</span>
		</div>
		<p>{body}</p>
	</a>
</li>
