<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import type { TaskWithUser } from "$lib/types";
	import { slide } from 'svelte/transition';
	import StatusIndicator from './statusIndicator.svelte';
	
	let { id, title, body, username, email, createdAt, status, creatorID, userID, userRole }: TaskWithUser & { userID: string, userRole: string}= $props();

	function handleEdit() {
		console.log("Editting");
	}

	async function handleDelete() {
		console.log("Deleting");
		const response = await fetch(`/api/task/${id}`, {
      		method: 'DELETE'
    	});
	}
</script>

<li class="my-3 p-4" transition:slide>
	<div class="flex justify-between">
		<div>
			<h3 class="text-xl"><StatusIndicator {status} /> {title}</h3>
			<p class="text-[12px] text-gray-600">{username ? username : email}</p>
		</div>
		<div class="flex flex-col">
			<span class="mt-1 text-[10px] text-gray-600">{createdAt.toLocaleString()}</span>
			{#if creatorID === userID || userRole === "admin"}
				<div class="flex justify-end">
				<DropdownMenu.Root>
				<DropdownMenu.Trigger class="border-0">Open</DropdownMenu.Trigger>
				<DropdownMenu.Content>
				<DropdownMenu.Group>
				<DropdownMenu.Item onSelect={handleEdit}>Edit</DropdownMenu.Item>
				<DropdownMenu.Item onSelect={handleDelete}>Delete</DropdownMenu.Item>
				</DropdownMenu.Group>
				</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
			{/if}	
		</div>
	</div>
	<p>{body}</p>
</li>
