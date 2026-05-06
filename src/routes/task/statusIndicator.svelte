<script lang="ts">
	let { status }: { status: 'not started' | 'working' | 'completed' } = $props();
	let color: 'bg-green-600' | 'bg-orange-600' | 'bg-gray-600' | null = $derived.by(() => {
		switch (status) {
			case 'not started':
				return 'bg-green-600';
			case 'working':
				return 'bg-orange-600';
			case 'completed':
				return 'bg-gray-600';
			default:
				return null;
		}
	});
</script>

<span class="mb-0.5 inline-block h-2 w-2 rounded-full {color}"></span>
