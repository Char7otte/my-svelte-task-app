<script lang="ts">
	import { slide } from 'svelte/transition';
	import StatusIndicator from './statusIndicator.svelte';
	let { id, title, body, username, email, createdAt, status } = $props();
	let option: 'edit' | 'delete' | '' = $state('');
	$inspect(option);
</script>

<li class="my-3 p-4" transition:slide>
	<div class="flex justify-between">
		<div>
			<h3 class="text-xl"><StatusIndicator {status} /> {title}</h3>
			<p class="text-[12px] text-gray-600">{username ? username : email}</p>
		</div>
		<span class="mt-1 text-[10px] text-gray-600">{createdAt.toLocaleString()}</span>
		<div class="align-end flex flex-col">
			<span class="mt-1 text-[10px] text-gray-600">{createdAt.toLocaleString()}</span><br />
			<div class="flex justify-end">
				<button type="button" class="flex-none border-none p-4 hover:text-shadow-lg">
					<select name="option" id="option" bind:value={option} class="appearance-none">
						<option value="edit">Edit</option>
						<option value="delete">Delete</option>
					</select>
				</button>
			</div>
		</div>
	</div>
	<p>{body}</p>
</li>
