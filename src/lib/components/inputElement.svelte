<!-- this file is such a meme -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = HTMLInputAttributes & { variant?: 'default' | 'none'; value?: string };

	let {
		class: className,
		variant = 'default',
		required = false,
		disabled = false,
		type = 'text',
		name,
		value = $bindable(''),
		placeholder = ''
	}: Props = $props();

	let variants = { default: 'mb-2 block border-2 border-solid px-1.5 py-1', none: '' };
	let finalClassList = $derived([variants[variant], className].join(' '));

	const dispatch = createEventDispatcher();

	function oninput(e: Event) {
		const target = e.target as HTMLInputElement;
		dispatch('valuechange', target.value);
	}
</script>

<input
	{type}
	{name}
	id={name}
	{required}
	{disabled}
	class={finalClassList}
	{oninput}
	{value}
	{placeholder}
/>
