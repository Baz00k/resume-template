<script lang="ts">
	import Icon from '@iconify/svelte';
	import { exportToPDF } from '$lib/exportToPDF';

	const onExportToPDF = () => {
		const resume = document.getElementById('resume');

		if (!resume) return;

		exportToPDF(resume);
	};
</script>

<header class="hidden w-full items-center justify-end px-6 pt-4 md:flex print:hidden">
	<button
		class="flex items-center justify-center rounded-full bg-gray-200 px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-gray-300 dark:bg-gray-100/10 dark:hover:bg-gray-100/20"
		on:click={onExportToPDF}
	>
		<Icon icon="material-symbols:download" class="mr-2 h-5 w-5" />
		PDF
	</button>
</header>
