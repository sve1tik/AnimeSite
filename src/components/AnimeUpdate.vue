<template>
	<div v-for="el in updateList.list" :key="el.code">
		<div v-if="el.posters">
			<router-link :to="{ name: 'serials', params: { id: el.code } }" @mouseenter="showDetails(el); flagDetails = true"
				@mouseleave="flagDetails = false">
				<div class="animeUpdate">
					<div class="details" v-if="currentDetails === el && flagDetails">
						<span>{{ el.names.ru }}</span>
						<span>Серия: {{ el.player.episodes.last == 1 ? el.player.episodes.last : el.player.episodes.string }}</span>
						<span class="schedule__desc">{{ sliceDesc(el.description) }}</span>
					</div>
					<img :src="'https://static-libria.weekstorm.one' + el.posters.small.url" alt="">
				</div>
			</router-link>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		let flagDetails = false;
		return {
			currentDetails: null,
			flagDetails,
		}
	},
	props: {
		updateList: Object,
	},
	methods: {
		sliceDesc(desc) {
			return desc !== null ? desc.slice(0, 200) + '...' : '';
		},
		showDetails(anime) {
			this.currentDetails = anime;
		},
		async gotoAnime(id) {
			await this.$router.replace({ name: 'serials', params: { id: id } });
		}
	}
};
</script>