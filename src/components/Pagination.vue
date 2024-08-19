<template>
	<div class="pagination">
		<button v-if="currentPage > 1" @click="changePage(currentPage - 1)">Предыдущая</button>

		<span v-for="n in pageCount" :key="n">
			<button @click="changePage(n)" v-class="{ active: currentPage === n }">{{ n }}</button>
		</span>

		<button v-if="currentPage < totalpageCount" @click="changePage(currentPage + 1)">Следующая</button>
	</div>
</template>

<script>
export default {
	props: {
		pageCount: Number,
		currentPage: Number
	},
	methods: {
		changePage(newPage) {
			this.$emit('page-change', newPage);
		}
	}
};
</script>