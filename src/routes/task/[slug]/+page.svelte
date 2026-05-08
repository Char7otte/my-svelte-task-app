<script lang="ts">
	import Task from '../task.svelte';
	import type { PageData, RouteParams } from './$types';

	let { data, params }: { data: PageData; params: RouteParams } = $props();
	// Route ensures slugTask exists
	let slugTask = $derived.by(() => data.tasks.find((task) => task.id === params.slug)!);
</script>

<h1>{params.slug}</h1>
<Task {...slugTask} />
