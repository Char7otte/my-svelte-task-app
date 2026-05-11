<script lang="ts">
  import { resolve } from '$app/paths';
  import type { TaskWithUser } from '$lib/types';
  import type { PageData } from './$types';
  import TaskCard from './taskCard.svelte';
  import TaskForm from './taskForm.svelte';

	const { data }: { data: PageData } = $props();
	let disabled = $derived<boolean>(data.user === undefined);

	let viewOption: string = $state<'all' | 'mine'>('all');
	let taskList: TaskWithUser[] = $derived.by(() => {
		if (viewOption === 'mine') return data.tasks.filter((t) => t.creatorID === data.user.id);
		return data.tasks;
	});
</script>

<div>
	{#if disabled}
		<h1 class="text-2xl">
			You need to <a href={resolve('/user')} class="text-blue-600 underline">sign in</a> to create tasks.
		</h1>
	{:else}
		<h1>Welcome, {data.user.username ? data.user.username : data.user.email}</h1>
	{/if}
</div>

<TaskForm {disabled}/>

<h2 class="text-2xl">
	<input
		type="radio"
		id="view-all"
		class="sr-only"
		value="all"
		name="view-option"
		bind:group={viewOption}
	/>
	<label for="view-all">All tasks</label>
	<input
		type="radio"
		id="view-mine"
		class="sr-only"
		value="mine"
		name="view-option"
		bind:group={viewOption}
		{disabled}
	/>
	<label for="view-mine">My tasks</label>
</h2>
<ul>
	{#if data.tasks.length === 0}
		<li>There are no tasks. Create one above!</li>
	{:else}
		{#each taskList as task (task.id)}
			<TaskCard {...task} userID={data.user.id} userRole={data.user.role}/>
		{/each}
	{/if}
</ul>
