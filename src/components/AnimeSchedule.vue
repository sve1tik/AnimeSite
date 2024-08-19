<template>
	<div class="content__container" v-for="(day, index) in daysList" :key="index">
		<h2 class="day">{{ day }}</h2>
		<div v-for="elem in anime[index]" :key="elem.list" class="content__el">
			<div v-for="el in elem" :key="el.id">
				<div v-if="el.posters">
					<router-link :to="{ name: 'serials', params: { id: el.code } }"
						@mouseenter="showDetails(el); flagDetails = true" @mouseleave="flagDetails = false">
						<div class="animeCard">
							<div class="details" v-if="currentDetails === el && flagDetails">
								<span>{{ el.names.ru }}</span>
								<span>Серия: {{ el.player.episodes.last != 1 ? el.player.episodes.string : el.player.episodes.last
									}}</span>
								<span class="schedule__desc">{{ sliceDesc(el.description) }}</span>
							</div>
							<img :src="'https://static-libria.weekstorm.one' + el.posters.original.url" alt="">
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			currentDetails: null,
			flagDetails: false,
			daysList: ["Понедельник:", "Вторник:", "Среда:", "Четверг:", "П'ятница:", "Суббота:", "Воскресенье:"],
		}
	},
	props: {
		anime: Object,
	},
	methods: {
		sliceDesc(desc) {
			return desc !== null ? desc.slice(0, 200) + '...' : '';
		},
		showDetails(anime) {
			this.currentDetails = anime;
		},
	}
};
</script>