<template>
	<div class="home">
		<div class="container">
			<div class="content">
				<AnimeSchedule :anime="data" v-if="data != null" />
			</div>
		</div>
	</div>
</template>

<script>
import AnimeSchedule from '../components/AnimeSchedule.vue'
import { defineComponent } from 'vue';
import { getSchedule } from '@/api/getApi';

export default defineComponent({
	name: 'HomeView',
	components: { AnimeSchedule },
	data() {
		return {
			data: null,
		}
	},
	async created() {
		await getSchedule().then(response => {
			this.data = response;
		});
	},
})
</script>

<style>
@import '@/assets/home.css';
</style>
