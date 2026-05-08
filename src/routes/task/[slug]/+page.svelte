<script lang="ts">
	import type { PageData, RouteParams } from './$types';
	import TaskDetail from './taskDetail.svelte';

	let { data, params }: { data: PageData; params: RouteParams } = $props();
	// Route ensures slugTask exists
	let slugTask = $derived.by(() => data.tasks.find((task) => task.id === params.slug)!);
</script>

<h1>{params.slug}</h1>
<TaskDetail {...slugTask} />
