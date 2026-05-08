<script lang="ts">
	import { slide } from 'svelte/transition';
	import StatusIndicator from './statusIndicator.svelte';
	let { title, body, username, email, createdAt, status } = $props();
</script>

<li class="my-3 cursor-pointer p-4 hover:shadow-lg" transition:slide>
	<div class="flex justify-between">
		<div>
			<h3 class="text-xl"><StatusIndicator {status} /> {title}</h3>
			<p class="text-[12px] text-gray-600">{username ? username : email}</p>
		</div>
		<span class="mt-1 text-[10px] text-gray-600">{createdAt.toLocaleString()}</span>
	</div>
	<p>{body}</p>
</li>
