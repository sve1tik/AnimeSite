<template>
	<div class="animeDetails" id="headAnime">
		<section>
			<div class="container">
				<div class="content">
					<h1>{{ data.names?.ru }}</h1>
					<div class="wrapp">
						<div class="description">
							<p><b>Сезон:</b> {{ data.season?.year }} {{ data.season?.string }}</p>
							<p><b>Тип:</b> {{ data.type?.full_string }}</p>
							<p class="genres"><b>Жанры:</b> <span v-for="(genres, index) in data.genres" :key="index"> {{ genres +
								(index < data.genres.length - 1 ? ',' : '') }} </span>
							</p>
							<p>{{ data.description }}</p>
						</div>
						<div class="poster">
							<span v-if="data.announce != null">{{ data.announce }}</span>
							<img v-if="data.posters != null" :src="`https://static-libria.weekstorm.one` + data.posters.original.url"
								alt="">
						</div>
					</div>
					<div class="animeReleases" :style="{ display: releases[0] ? 'block' : 'none' }">
						<AnimeReleases :releases="releases" />
					</div>
				</div>
			</div>
		</section>
		<section class="video">
			<div class="container">
				<div :id="data.id" v-if="data.player && !data.player.is_rutube"></div>
				<img src="/load.png" width="100%" v-else alt="">
			</div>
		</section>
	</div>
</template>
<script>
import getInfo from "@/api/getApi"
import AnimeReleases from "@/components/AnimeReleases.vue"
import pjs from '../playerJs/playerjsloader'

export default {
	name: "AnimeDetails",
	components: { AnimeReleases },
	data() {
		return {
			eplist: 1,
			data: {},
			releases: [],
			playlist: [],
			player: null
		}
	},
	props: ['id'],
	async created() {
		await this.fetchData();
	},
	methods: {
		async fetchData() {
			await getInfo(this.id).then(response => {
				this.eplist = response.player.episodes.last;
				this.data = response;
				console.log(this.data)
				this.releases = response.franchises && response.franchises[0] ? response.franchises[0].releases : [];
				let episodeList = Array.from({ length: this.eplist }, (_, i) => i + 1);
				this.playlist = episodeList.map(episode => {
					const episodeData = response.player.list[episode];
					if (episodeData && episodeData.hls && !this.data.player.is_rutube) {
						return {
							title: `Эпизод ${episode}`,
							file: episodeData.hls.fhd != null ? `[480p]https://cache.libria.fun${episodeData.hls.sd},
              [720p]https://cache.libria.fun${episodeData.hls.hd},
              [1080p]https://cache.libria.fun${episodeData.hls.fhd}
              ` : `[480p]https://cache.libria.fun${episodeData.hls.sd},
              [720p]https://cache.libria.fun${episodeData.hls.hd}`,
							poster: this.data.player.list[episode].preview != null ? `https://static-libria.weekstorm.one${this.data.player.list[episode].preview}` : '/AnimeSite/preview.png',
							"default_quality": "720p",
							id: this.data.id,
						};
					}
				});
				if (this.playlist.length > 0) {
					this.initplayer(this.playlist, this.data.code, this.data.id);
				}
			})
		},
		async initplayer(playlist, cuid, id) {
			await pjs.then(() => {
				// eslint-disable-next-line
				this.player = new Playerjs({
					id: id,
					file: playlist,
					cuid: cuid,
					error: (error) => {
						console.error(`Error loading video: ${error}`);
					}
				});
			});
		}
	}
}
</script>

<style>
@import '@/assets/about.css';
</style>
