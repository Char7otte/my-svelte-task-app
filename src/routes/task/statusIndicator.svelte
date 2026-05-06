<script lang="ts">
	let { status }: { status: 'not started' | 'working' | 'completed' } = $props();
</script>

<span>
	{#if status === 'not started'}
		<span class="mb-0.5 inline-block h-2 w-2 rounded-full bg-green-600"></span>
	{:else if status === 'working'}
		<span class="mb-0.5 inline-block h-2 w-2 rounded-full bg-orange-600"></span>
	{:else}
		<span class="mb-0.5 inline-block h-2 w-2 rounded-full bg-gray-600"></span>
	{/if}
</span>
