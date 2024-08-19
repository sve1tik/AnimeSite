<template>
	<div class="anime__wrapp" v-for="(el, index) in anime" :key="index">
		{{ console.log(el) }}
		<router-link v-if="el.code" :to="{ name: 'serials', params: { id: el.code } }"
			@mouseenter="showDetails(el); flagDetails = true" @mouseleave="flagDetails = false">
			<div class="animeCard">
				<div class="details" v-if="currentDetails === el && flagDetails">
					<span>{{ el.names.ru }}</span>
					<span>Серия: {{ el.player.episodes.last != 1 ? el.player.episodes.string :
						el.player.episodes.last }}
					</span>
					<span class="schedule__desc">{{ sliceDesc(el.description) }}</span>
				</div>
				<img :src="'https://static-libria.weekstorm.one' + el.posters.original.url" alt="" v-if="el.posters != null">
			</div>
		</router-link>

	</div>
</template>

<script>

export default {
	props: {
		anime: {
			type: Object,
			required: true
		},
	},
	data() {
		return {
			currentDetails: null,
			flagDetails: false,
		}
	},
	methods: {
		sliceDesc(desc) {
			return desc !== null ? desc.slice(0, 200) + '...' : '';
		},
		showDetails(anime) {
			this.currentDetails = anime;
		},
	},
};
</script>