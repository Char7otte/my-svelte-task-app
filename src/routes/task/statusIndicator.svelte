<script lang="ts">
	let { status }: { status: 'not started' | 'working' | 'completed' } = $props();

	const colorDictionary = {
		'not started': 'bg-green-600',
		working: 'bg-orange-600',
		completed: 'bg-gray-600'
	};
</script>

<span class="mb-0.5 inline-block h-2 w-2 rounded-full {colorDictionary[status]}"></span>
